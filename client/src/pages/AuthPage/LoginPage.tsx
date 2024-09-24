import { Link } from '@mui/material';

import AuthInput from '../../components/UI/mui/Inputs/AuthInput/AuthInput';
import AuthButton from '../../components/UI/mui/Buttons/AuthButton/AuthButton';

import { ERoutePaths } from '../../types/ERoutePaths';

import './AuthPage.scss';

const LoginPage = () => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <div className="auth_title">
          <h1>Login</h1>
        </div>
        <form className="auth_form" onSubmit={handleSubmit}>
          <AuthInput name="emailOrUsername" type="text" placeholder="Email or username" />
          <AuthInput name="password" type="password" placeholder="Password" />
          <AuthButton placeholder="Login" type="submit" />
        </form>
      </div>
      <div className="auth_footer">
        <span>Don`t have an account?</span>
        <Link href={ERoutePaths.register}>Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
