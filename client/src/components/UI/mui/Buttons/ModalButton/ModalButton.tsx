import { FC } from 'react';
import { Button } from '@mui/material';
import './ModalButton.scss';

interface ModalButton {
  className?: string;
  placeholder: string;
  state?: 'positive' | 'negative';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const ModalButton: FC<ModalButton> = ({ className, state, placeholder, type, onClick }) => {
  return (
    <Button
      className={`modal_button ${state} ${className}`}
      variant="contained"
      type={type}
      onClick={onClick}
    >
      {placeholder}
    </Button>
  );
};

export default ModalButton;
