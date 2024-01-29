import { GameState } from 'src/types/Pokemon';

export const Statistics = ({ state: { score, moves, misses, roundsPlayed } }: { state: GameState }): JSX.Element => (
  <div className='statistics'>
    <p>Score {score}</p>
    <p>Moves {moves}</p>
    <p>Missed {misses}</p>
    <p>Rounds played {roundsPlayed}</p>
  </div>
);
