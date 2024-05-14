import { ChangeEvent } from 'react';
import classes from './index.module.css';

interface ISearchInputProps {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: TSearchInput
}

type TSearchInput =
  | 'text'

const SearchInput = (props:ISearchInputProps) => {
  const {onChange, placeholder, type} = props

  return (
    <input
      className={classes.input}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SearchInput;
