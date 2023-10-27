import React from "react";
import { Form } from "antd";
import { FormikProps } from "formik";
import { CustomInput, CustomButton } from "../../components";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { LoginFormValues } from "../../utils/type";

interface LoginFormProps {
  formikProps: FormikProps<LoginFormValues>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (values: LoginFormValues) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formikProps,
  showPassword,
  setShowPassword,
  handleLogin,
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } =
    formikProps;
  
  

  return (
    <Form
      onSubmitCapture={(e) => {
        e.preventDefault();
        handleLogin(values);
      }}
    >
      <Form.Item
        help={touched.email && errors.email ? errors.email : ""}
        validateStatus={touched.email && errors.email ? "error" : undefined}
      >
        <CustomInput
          prefix={
            <MailOutlined
              style={{ color: "rgba(242,242,242,.25)", marginRight: "10px" }}
            />
          }
          placeholder="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
      </Form.Item>

      <Form.Item
        help={touched.password && errors.password ? errors.password : ""}
        validateStatus={
          touched.password && errors.password ? "error" : undefined
        }
      >
        <CustomInput
          prefix={
            <LockOutlined
              style={{ color: "rgba(242,242,242,.25)", marginRight: "10px" }}
            />
          }
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          suffix={
            showPassword ? (
              <EyeOutlined
                style={{ color: "rgba(242,242,242,.25)" }}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeInvisibleOutlined
                style={{ color: "rgba(242,242,242,.25)" }}
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          }
        />
      </Form.Item>

      <Form.Item>
        <CustomButton
          shape="round"
          style={{
            marginTop: "16px",
            color:
              isSubmitting || !values.email || !values.password
                ? "#fff"
                : undefined,
          }}
          type="primary"
          htmlType="submit"
          disabled={isSubmitting || !values.email || !values.password}
          block
        >
          Sign in
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
