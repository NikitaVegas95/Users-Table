import { MouseEventHandler } from 'react';

interface IButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>
  typeButton: TSearchButton
}

type TSearchButton =
  | 'reset'

const SearchButton = (props:IButtonProps) => {
  const {text, onClick, typeButton} = props

  return (
    <button
      onClick={onClick}
      type={typeButton}
    >
      {
        text
      }
    </button>
  );
};

export default SearchButton;
