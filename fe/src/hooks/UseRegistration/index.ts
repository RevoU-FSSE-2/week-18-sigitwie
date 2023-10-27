import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import { RegisterFormValues } from "../../utils/type";

export const useRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const handleRegistration = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://w18.eswe.dev/v1/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setRegistrationSuccess(true);
        setRegistrationError(null);
        Modal.success({
          title: "Registration Successful",
          content:
            "You have successfully registered. You will be redirected to the login page.",
          onOk: () => navigate("/login"),
        });
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.message || "Registration failed.");
        message.error(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setRegistrationError("Registration failed. Please try again later.");
      message.error("Registration failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    registrationSuccess,
    registrationError,
    handleRegistration,
  };
};

export default useRegistration;
