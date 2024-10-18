import { useEffect, useState } from 'react';

import { getUserData } from '../../API/axiosRequests';
import Sidebar from '../../components/Sidebar/Sidebar';
import NoteTable from '../../components/NoteTable/NoteTable';
import useDelayedToggle from '../../utils/hooks/useDelayToggle';
import { useAuthStore } from '../../zustand/AuthStore/useAuthStore';
import CommonModal from '../../components/UI/mui/Modals/CommonModal/CommonModal';
import ModalButton from '../../components/UI/mui/Buttons/ModalButton/ModalButton';
import CustomBackdrop from '../../components/UI/mui/styled/SidebarBackdrop/SidebarBackdrop.styled';

import './NoteTablePage.scss';

const NoteTablePage = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { logout } = useAuthStore();

  useEffect(() => {
    try {
      const getData = async () => await getUserData();

      getData();
    } catch (e) {
      const err = e as Error;
      console.error('Error in NoteTablePage useEffect', err.message);
    }
  }, []);

  const handleOpenSidebar = () => setOpenSidebar(true);
  const handleCloseSidebar = () => setOpenSidebar(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => logout();

  const showText = useDelayedToggle(openSidebar, 100);

  return (
    <div className="note_wrapper">
      <Sidebar
        open={openSidebar}
        handleOpen={handleOpenSidebar}
        handleOpenModal={handleOpenModal}
        showText={showText}
      />
      <CommonModal open={openModal} handleClose={handleCloseModal} timeout={300}>
        <h2>Logout of the account?</h2>
        <div className="modal_buttons">
          <ModalButton placeholder="Yes" state="positive" onClick={handleLogout} />
          <ModalButton placeholder="No" state="negative" onClick={handleCloseModal} />
        </div>
      </CommonModal>

      <div className="content">
        <CustomBackdrop open={openSidebar} onClick={handleCloseSidebar} />
        <NoteTable />
      </div>
    </div>
  );
};

export default NoteTablePage;
