import { MemoryFieldSelect } from '../MemoryFieldSelect';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../Switch';
import { TimeFieldSelect } from '../TimeFieldSelect';

type Props = {
  onGameStart: () => void;
};

export const StartPage = ({ onGameStart }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='start-page-wrapper'>
      <div className='start-page'>
        <h1>Memory game</h1>
        <p>
          Your task is to find all pairs of cards by turning them face down. Turn two cards over and try to find
          matching Pokemon.
        </p>
        <MemoryFieldSelect />
        <TimeFieldSelect />

        <div
          className='start-button'
          onClick={() => {
            onGameStart();
            navigate('/cards');
          }}
        >
          Start game
        </div>
      </div>
      <Switch />
    </div>
  );
};
