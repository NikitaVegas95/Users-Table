import { MouseEventHandler } from 'react';

interface IButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>
  type: TSearchButton
}

type TSearchButton =
  | 'reset'

const SearchButton = (props:IButtonProps) => {
  const {text, onClick, type} = props

  return (
    <button
      onClick={onClick}
      type={type}
    >
      {
        text
      }
    </button>
  );
};

export default SearchButton;
