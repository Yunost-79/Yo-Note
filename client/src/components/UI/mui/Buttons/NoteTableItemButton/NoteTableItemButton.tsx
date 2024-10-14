import { FC, ReactNode, useState } from 'react';
import { IconButton } from '@mui/material';

import './NoteTableItemButton.scss';

interface NoteTableItemButton {
  className?: string;
  children: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (() => void)[];
  typeOfButton: 'pin' | 'edit' | 'delete';
}

const NoteTableItemButton: FC<NoteTableItemButton> = ({
  className,
  children,
  type,
  onClick = [],
  typeOfButton,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    setActive(!active);

    onClick.forEach((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  };
  return (
    <IconButton
      className={`item_button ${active ? 'active' : ''} ${typeOfButton} ${className}`}
      type={type}
      onClick={handleClick}
    >
      {children}
    </IconButton>
  );
};

export default NoteTableItemButton;
