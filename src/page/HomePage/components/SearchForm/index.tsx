import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { ChangeEvent, MouseEventHandler } from 'react';
import classes from './index.module.css';

interface ISearchForm {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  typeButton: TSearchButton
  type: TSearchInput
  placeholder: string;
}

type TSearchButton =
  | 'reset'

type TSearchInput =
  | 'text'

const SearchForm = (props: ISearchForm) => {

  const {
    onChange,
    onClick,
    typeButton,
    text,
    type,
    placeholder
  } = props

  return (
    <form className={classes.form}>
      <SearchInput
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
      <SearchButton
        text={text}
        typeButton={typeButton}
        onClick={onClick}
      />
    </form>
  );
};

export default SearchForm;
