import { Button } from '@mui/material';
import React from 'react';

import './AuthButton.scss';

interface IAuthButton {
  className?: string;
  placeholder: string;
  type?: 'submit' | 'button' | 'reset';
}
const AuthButton: React.FC<IAuthButton> = ({ className, placeholder, type }) => {
  return (
    <Button className={`auth_button ${className}`} variant="contained" type={type}>
      {placeholder}
    </Button>
  );
};

export default AuthButton;
