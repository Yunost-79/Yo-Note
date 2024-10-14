import { useState } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import NoteTable from '../../components/NoteTable/NoteTable';

import CustomBackdrop from '../../components/UI/mui/styled/SidebarBackdrop/SidebarBackdrop.styled';

import useDelayedToggle from '../../utils/hooks/useDelayToggle';

import './NoteTablePage.scss';

const NoteTablePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const showText = useDelayedToggle(open, 100);

  return (
    <div className="note_wrapper">
      <Sidebar open={open} handleOpen={handleOpen} showText={showText} />

      <div className="content">
        <CustomBackdrop open={open} onClick={handleClose} />
        <NoteTable />
      </div>
    </div>
  );
};

export default NoteTablePage;
