import './NoteTable.scss';

import NoteTableItem from './NoteTableItem/NoteTableItem';

import NoteTableInput from '../UI/mui/Inputs/NoteTableInput/NoteTableInput';

const NoteTable = () => {
  return (
    <div className="note_table">
      <div className="table_search">
          <NoteTableInput type="text" placeholder="Search" />
      </div>
      <div className="table_items">
        <NoteTableItem />
        <NoteTableItem />
        <NoteTableItem /> <NoteTableItem /> <NoteTableItem />
        <NoteTableItem />
        <NoteTableItem /> <NoteTableItem /> <NoteTableItem /> <NoteTableItem /> <NoteTableItem />
        <NoteTableItem /> <NoteTableItem />
      </div>
    </div>
  );
};

export default NoteTable;
