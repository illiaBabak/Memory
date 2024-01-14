import { MemoryFieldSelect } from '../MemoryFieldSelect';
import { useNavigate } from 'react-router-dom';

export const StartPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='start-page'>
      <h1>Memory game</h1>
      <p>
        Your task is to find all pairs of cards by turning them face down. Turn two cards over and try to find matching
        Pokemon.
      </p>
      <MemoryFieldSelect />

      <div className='start-button' onClick={() => navigate('/cards')}>
        Start game
      </div>
    </div>
  );
};
