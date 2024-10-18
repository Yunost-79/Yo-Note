import { Link } from '@mui/material';

import AuthInput from '../../../components/UI/mui/Inputs/AuthInput/AuthInput';
import AuthButton from '../../../components/UI/mui/Buttons/AuthButton/AuthButton';

import { FC } from 'react';
import { register } from '../../../API/axiosRequests';
import { AxiosError } from 'axios';
import { RegisterUserData } from '../../../API/axiosRequests.types';
import { ERoutePaths } from '../../../types/ERoutePaths';
import { useFormik } from 'formik';
import { registerValidationSchema } from '../../../utils/yup/yupSchemas';
import { useNavigate } from 'react-router';
import { EAuthName, EAuthType } from '../../../types/EAuth';
import '../AuthPage.scss';
interface Register {
  setIsLogin: (isLogin: boolean) => void;
}

const Register: FC<Register> = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      rePassword: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { setFieldError }) => {
      const userData: RegisterUserData = {
        email: values.email.trim(),
        username: values.username.trim(),
        password: values.password.trim(),
        rePassword: values.rePassword.trim(),
      };

      try {
        await register(userData);
        navigate(ERoutePaths.main);
      } catch (e) {
        const err = e as AxiosError;
        if (err.response && err.response.data) {
          const errorData = err.response.data as { error?: { type: string; text: string } };
          if (errorData.error?.type === EAuthName.username) {
            setFieldError(EAuthName.username, errorData.error.text);
          }
          if (errorData.error?.type === EAuthName.email) {
            setFieldError(EAuthName.email, errorData.error.text);
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
          <h1>Create Account</h1>
        </div>
        <form className="auth_form" onSubmit={formik.handleSubmit}>
          <AuthInput
            name={EAuthName.email}
            type={EAuthType.text}
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <AuthInput
            name={EAuthName.username}
            type={EAuthType.text}
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
          <AuthInput
            name={EAuthName.rePassword}
            type={EAuthType.password}
            placeholder="Repeat your password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
            helperText={formik.touched.rePassword && formik.errors.rePassword}
          />
          <AuthButton type={EAuthType.submit} placeholder="Register" />
        </form>
      </div>
      <div className="auth_footer">
        <span>Already have an account?</span>
        <Link onClick={() => setIsLogin(true)}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
