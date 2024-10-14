import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import NoteTableItemButton from '../../UI/mui/Buttons/NoteTableItemButton/NoteTableItemButton';
import './NoteTableItem.scss';
const NoteTableItem = () => {
  const tags = [
    '#Meditation',
    '#Mindfulness',
    '#Wellbeing',
    '#Focus',
    '#Relaxation',
    '#Balance',
    '#Peace',
    '#Calm',
    '#SelfCare',
    '#Yoga',
  ];
  return (
    <div className="table_item">
      <div className="item_header">
        <div className="header_text">
          <h2>Practice Mindfulness Meditation</h2>
          <span>6th Apr 2024</span>
        </div>
        <div className="header_pin">
          <NoteTableItemButton typeOfButton="pin" children={<PushPinOutlinedIcon />} />
        </div>
      </div>
      <div className="item_main">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, similique?</p>
      </div>
      <div className="item_footer">
        <div className="footer_tags">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <div className="footer_buttons">
          <NoteTableItemButton typeOfButton="edit" children={<EditOutlinedIcon />} />

          <NoteTableItemButton typeOfButton="delete" children={<DeleteOutlineOutlinedIcon />} />
        </div>
      </div>
    </div>
  );
};

export default NoteTableItem;
