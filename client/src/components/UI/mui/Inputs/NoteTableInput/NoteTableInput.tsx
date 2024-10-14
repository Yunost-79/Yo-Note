import { FC, FocusEvent } from 'react';
import { FormHelperText, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './NoteTableInput.scss';

interface NoteTableInput {
  className?: string;
  name?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText?: string | false | undefined;
}

const NoteTableInput: FC<NoteTableInput> = ({
  className,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  return (
    <div className={`input ${className ? className : ''} ${error ? 'error' : ''}`}>
      <Paper className="input_form">
        <InputBase
          className="input_item"
          placeholder={placeholder}
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
        />
        <IconButton
          className={`button`}
          type="button"
          aria-label="show-input"
          //   onClick={() => setIsShowText(!isShowText)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {helperText && (
        <FormHelperText className="helper-text" error={error}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};

export default NoteTableInput;
