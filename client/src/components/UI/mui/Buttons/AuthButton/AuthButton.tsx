import { FC } from 'react';
import { Button } from '@mui/material';

import './AuthButton.scss';

interface AuthButton {
  className?: string;
  placeholder: string;
  type: 'submit' | 'button' | 'reset' | undefined ;
  onClick?: () => void;
}
const AuthButton: FC<AuthButton> = ({ className, placeholder, type, onClick }) => {
  return (
    <Button
      className={`auth_button ${className}`}
      variant="contained"
      type={type}
      onClick={onClick}
    >
      {placeholder}
    </Button>
  );
};

export default AuthButton;
