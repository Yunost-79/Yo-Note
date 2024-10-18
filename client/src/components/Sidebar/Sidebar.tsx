import { FC } from 'react';

import { useUserStore } from '../../zustand/UserStore/useUserStore';

import CustomLogoIcon from '../UI/icon/CustomLogoIcon';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import './Sidebar.scss';

interface Sidebar {
  open: boolean;
  handleOpen: () => void;
  showText: boolean;
  handleOpenModal: () => void;
}
const Sidebar: FC<Sidebar> = ({ open, handleOpen, showText, handleOpenModal }) => {
  const { user } = useUserStore();

  return (
    <div onClick={handleOpen} className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar_content">
        <div className="sidebar_user_info">
          {user ? (
            <>
              <img className="icon" src={user.profileAvatar} alt="user_avatar" />
              {open && <span className={`${showText ? 'show' : ''}`}>{user.username}</span>}
            </>
          ) : (
            <>
              <AccountCircleIcon className="icon" />
              {open && <span className={`${showText ? 'show' : ''}`}>Username</span>}
            </>
          )}
        </div>
        <div className="sidebar_list"></div>
        <div className="sidebar_bottom">
          <div className="setting item">
            <SettingsIcon className="icon" />
            {open && <span className={`${showText ? 'show' : ''}`}>Settings</span>}
          </div>
          <div className="logout item" onClick={handleOpenModal}>
            <LogoutOutlinedIcon className="icon" />
            {open && <span className={`${showText ? 'show' : ''}`}>Logout</span>}
          </div>
        </div>

        <div className="sidebar_logo">
          {open && <span className={`logo_text ${showText ? 'show' : ''}`}>YoNote</span>}
          <CustomLogoIcon className="icon icon_logo" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
