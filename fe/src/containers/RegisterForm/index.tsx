import React from 'react';
import { Form } from 'antd';
import { CustomButton, CustomInput } from "../../components";
import { MailOutlined, LockOutlined, UserOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { FormikProps } from 'formik';
import { RegisterFormValues } from '../../utils/type';

type RegisterFormProps = {
    formikProps: FormikProps<RegisterFormValues>;
    showPassword?: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  };
  

const RegisterForm: React.FC<RegisterFormProps> = ({ formikProps, showPassword, setShowPassword }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formikProps;

  return (
    <Form onSubmitCapture={handleSubmit} style={{ maxWidth: 400 }}>
      <Form.Item
        help={touched.username && errors.username ? errors.username : ""}
        validateStatus={touched.username && errors.username ? "error" : undefined}
      >
        <CustomInput
          prefix={<UserOutlined style={{ color: "rgba(242,242,242,.25)", marginRight: "10px" }} />}
          placeholder="Username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
      </Form.Item>

      <Form.Item
        help={touched.email && errors.email ? errors.email : ""}
        validateStatus={touched.email && errors.email ? "error" : undefined}
      >
        <CustomInput
          prefix={<MailOutlined style={{ color: "rgba(242,242,242,.25)", marginRight: "10px" }} />}
          placeholder="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
      </Form.Item>

      <Form.Item
        help={touched.password && errors.password ? errors.password : ""}
        validateStatus={touched.password && errors.password ? "error" : undefined}
      >
        <CustomInput
          prefix={<LockOutlined style={{ color: "rgba(242,242,242,.25)", marginRight: "10px" }} />}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          suffix={
            showPassword ? (
              <EyeOutlined
                style={{ color: "rgba(0,0,0,.45)" }}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeInvisibleOutlined
                style={{ color: "rgba(0,0,0,.45)" }}
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          }
        />
      </Form.Item>

      <Form.Item>
        <CustomButton
          shape="round"
          style={{ marginTop: "16px" }}
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          block
        >
          Sign Up
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
