import { Button } from '@mui/material';
import React from 'react';

import './AuthButton.scss';

interface AuthButton {
  className?: string;
  placeholder: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
}
const AuthButton: React.FC<AuthButton> = ({ className, placeholder, type, onClick }) => {
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
