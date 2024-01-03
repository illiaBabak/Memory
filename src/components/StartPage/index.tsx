import { MemoryFieldSelect } from '../MemoryFieldSelect';

type Props = {
  setIsStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StartPage = ({ setIsStartGame }: Props): JSX.Element => {
  const handleClick = () => {
    setIsStartGame((prev) => !prev);
  };

  return (
    <div className='start-page'>
      <h1>Memory game</h1>
      <p>
        Your task is to find all pairs of cards by turning them face down. Turn two cards over and try to find matching
        Pokemon.
      </p>
      <MemoryFieldSelect />
      <div className='start-button' onClick={handleClick}>
        Start game
      </div>
    </div>
  );
};
