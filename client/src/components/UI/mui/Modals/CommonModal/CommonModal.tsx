import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

import './CommonModal.scss';
interface CommonModal {
  open: boolean;
  children?: ReactNode;
  handleClose: () => void;
  timeout?: number;
}
const CommonModal: FC<CommonModal> = ({ open, handleClose, children, timeout }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: timeout || 500,
        },
      }}
    >
      <Fade in={open}>
        <Box component="div">{children}</Box>
      </Fade>
    </Modal>
  );
};

export default CommonModal;
