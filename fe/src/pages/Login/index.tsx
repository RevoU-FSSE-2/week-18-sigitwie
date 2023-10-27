import React, { useState, useContext, useEffect } from "react";
import { Typography, Modal, Button, Spin } from "antd";
import { CustomCard } from "../../components"
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginFormValues } from "../../utils/type";
import { validationSchema } from "../../utils/validation";
import { AuthContext } from "../../contexts/AuthContext";
import LoginForm from "../../containers/LoginForm";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBlockedModalVisible, setIsBlockedModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    authContext?.clearError();
  };

  const showBlockedModal = () => {
    setIsBlockedModalVisible(true);
  };

  const handleBlockedModalOk = () => {
    setIsBlockedModalVisible(false);
    authContext?.clearError();
  };

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    if (authContext) {
      try {
        await authContext.login(values);
        if (authContext.isAuthenticated) {
          navigate("/home");
        }
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          showBlockedModal();
        } else {
          showModal();
          authContext.clearError();
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.error("AuthContext is undefined");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authContext) {
      if (authContext.isAuthenticated) {
        navigate("/home");
      } else if (authContext?.error) {
        if (authContext.error.status === 403) {
          showBlockedModal();
        } else {
          showModal();
        }
      }
    } else {
      console.log("authContext is undefined");
    }
  }, [authContext, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CustomCard title=''style={{ width: 400, padding: "20px", position: 'relative' }}>
        <Typography.Title
          level={2}
          style={{ textAlign: "left", marginTop: "0px", color: "#DFDFDF" }}
        >
          Sign In
        </Typography.Title>
        <p style={{ marginBottom: "50px", color: "#DFDFDF" }}>
          New user?
          <span
            style={{ color: "#5981BD", cursor: "pointer", marginLeft: "4px" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
        <Formik<LoginFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {(formikProps) => (
            <LoginForm
              formikProps={formikProps}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleLogin={handleLogin}
            />
          )}
        </Formik>
  
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // semi-transparent white
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin tip="Loading..." />
          </div>
        )}
      </CustomCard>

      <Modal
        title="Login Error"
        open={isModalVisible}
        onOk={handleModalOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <p>Email or password is incorrect.</p>
      </Modal>

      <Modal
        title="User Blocked"
        open={isBlockedModalVisible}
        onOk={handleBlockedModalOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleBlockedModalOk}>
            OK
          </Button>,
        ]}
      >
        <p>Your account has been blocked. Please try again in 5 minutes.</p>
      </Modal>
    </div>
  );
};

export default Login;
