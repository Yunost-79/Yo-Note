import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';

import { STANDARD_Z_INDEX } from '../../../../../variables/globalVariables';

const CustomBackdrop = styled(Backdrop)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  zIndex: STANDARD_Z_INDEX + 1,
  backdropFilter: 'blur(0.25rem)',
  opacity: 0.5,
}));

export default CustomBackdrop as typeof Backdrop;
