import React, {useState} from 'react';
import { Typography } from 'antd';
import { CustomCard } from '../../components';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RegisterFormValues } from '../../utils/type';
import { validationSchema } from '../../utils/validation';
import { RegisterForm } from '../../containers';
import { useRegistration } from '../../hooks';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { handleRegistration } = useRegistration();

  const initialValues: RegisterFormValues = {
    username: '',
    email: '',
    password: ''
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div data-testid="register-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CustomCard title='' style={{ width: 400, padding: '20px' }}>
        <Typography.Title level={3} style={{ textAlign: 'left', marginTop: '0px', color: "#DFDFDF" }}>
          Sign up
        </Typography.Title>
        <p style={{ marginBottom: '50px', color: "#DFDFDF" }}>
          Already have an account?
          <span 
            style={{ color: "#5981BD", cursor: 'pointer', marginLeft: '4px' }}
            onClick={() => navigate('/login')}
          >
            Sign in
          </span>
        </p>

        <Formik<RegisterFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleRegistration(values)}
        >
          {(formikProps) => (
            <RegisterForm formikProps={formikProps}
            showPassword={showPassword} 
            setShowPassword={setShowPassword} />
          )}
        </Formik>
      </CustomCard>
    </div>
  );
};

export default Register;
