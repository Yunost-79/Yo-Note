import { FC } from 'react';

import CustomLogoIcon from '../UI/mui/icon/CustomLogoIcon';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import './Sidebar.scss';

interface Sidebar {
  open: boolean;
  handleOpen: () => void;
  showText: boolean;
}
const Sidebar: FC<Sidebar> = ({ open, handleOpen, showText }) => {
  return (
    <div onClick={handleOpen} className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar_content">
        <div className="sidebar_user_info">
          <AccountCircleIcon className="icon" />
          {open && <span className={`${showText ? 'show' : ''}`}>First_name Last_name</span>}
        </div>
        <div className="sidebar_list"></div>
        <div className="sidebar_setting">
          <SettingsIcon className="icon" />
          {open && <span className={`${showText ? 'show' : ''}`}>Settings</span>}
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
