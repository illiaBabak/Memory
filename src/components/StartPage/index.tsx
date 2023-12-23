import { MemoryFieldSelect } from '../MemoryFieldSelect';
import { StartButton } from '../StartButton';

export const StartPage = (): JSX.Element => {
  return (
    <div className='start-page'>
      <h1>Memory game</h1>
      <p>
        Your task is to find all pairs of cards by turning them face down. Turn two cards over and try to find matching
        Pokemon.
      </p>
      <MemoryFieldSelect />
      <StartButton />
    </div>
  );
};
