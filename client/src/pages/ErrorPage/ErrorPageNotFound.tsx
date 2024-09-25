import { useNavigate } from 'react-router';

import './ErrorPageNotFound.scss';
import AuthButton from '../../components/UI/mui/Buttons/AuthButton/AuthButton';
import { ERoutePaths } from '../../types/ERoutePaths';

const ErrorPageNotFound = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(ERoutePaths.main, { replace: true });
  };

  return (
    <div className="error_wrapper">
      <div className="error_container">
        <h1>Oops!</h1>
        <span>Error 404 - page not found</span>
        <AuthButton onClick={handleNavigate} placeholder="Go to homepage" />
      </div>
    </div>
  );
};

export default ErrorPageNotFound;
