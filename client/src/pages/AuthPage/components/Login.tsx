import { FC } from 'react';
import { loginValidationSchema } from '../../../utils/yup/yupSchemas';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { EAuthName, EAuthType } from '../../../types/EAuth';
import { ERoutePaths } from '../../../types/ERoutePaths';
import { login } from '../../../API/axiosRequests';
import { LoginUserData } from '../../../API/axiosRequests.types';
import { AxiosError } from 'axios';

import { Link } from '@mui/material';

import AuthInput from '../../../components/UI/mui/Inputs/AuthInput/AuthInput';
import AuthButton from '../../../components/UI/mui/Buttons/AuthButton/AuthButton';

import '../AuthPage.scss';

interface Login {
  setIsLogin: (isLogin: boolean) => void;
}

const Login: FC<Login> = ({ setIsLogin }) => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setFieldError }) => {
      const userData: LoginUserData = {
        usernameOrEmail: values.usernameOrEmail.trim(),
        password: values.password.trim(),
      };

      try {
        const response = await login(userData);
        if (response) {
          navigate(ERoutePaths.main);
        }
      } catch (e) {
        const err = e as AxiosError;
        if (err.response && err.response.data) {
          const errorData = err.response.data as { error?: { type: string; text: string } };
          if (errorData.error) {
            if (
              errorData.error.type === EAuthName.username ||
              errorData.error.type === EAuthName.usernameOrEmail
            ) {
              setFieldError(EAuthName.usernameOrEmail, errorData.error.text);
            }

            if (errorData.error.type === EAuthName.password) {
              setFieldError(EAuthName.password, errorData.error.text);
            }
          }
        } else {
          console.error('Unexpected error:', err.message || 'Unknown error');
        }
      }
    },
  });
  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <div className="auth_title">
          <h1>Login</h1>
        </div>
        <form className="auth_form" onSubmit={formik.handleSubmit}>
          <AuthInput
            name={EAuthName.usernameOrEmail}
            type={EAuthType.text}
            placeholder="Username or email"
            value={formik.values.usernameOrEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
            helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
          />

          <AuthInput
            name={EAuthName.password}
            type={EAuthType.password}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <AuthButton type={EAuthType.submit} placeholder="Login" />
        </form>
      </div>
      <div className="auth_footer">
        <span>Don`t have an account?</span>
        <Link onClick={() => setIsLogin(false)}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
