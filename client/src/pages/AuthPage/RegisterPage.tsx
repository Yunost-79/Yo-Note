import { Link } from '@mui/material';

import AuthInput from '../../components/UI/mui/Inputs/AuthInput/AuthInput';
import AuthButton from '../../components/UI/mui/Buttons/AuthButton/AuthButton';

import { ERoutePaths } from '../../types/ERoutePaths';

import './AuthPage.scss';


const RegisterPage = () => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <div className="auth_title">
          <h1>Create Account</h1>
        </div>
        <form className="auth_form" onSubmit={handleSubmit}>
          <AuthInput name="email" type="text" placeholder="Email" />
          <AuthInput name="username" type="text" placeholder="Username" />
          <AuthInput name="password" type="password" placeholder="Password" />
          <AuthInput name="rePassword" type="password" placeholder="Repeat your password" />
          <AuthButton placeholder="Register" type="submit" />
        </form>
      </div>
      <div className="auth_footer">
        <span>Already have an account?</span>
        <Link href={ERoutePaths.login} >Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
