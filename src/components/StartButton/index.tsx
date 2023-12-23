import { useContext } from 'react';
import { PropsStartPage } from 'src/App';

export const StartButton = (): JSX.Element => {
  const contextVal = useContext(PropsStartPage);
  if (!contextVal) return <div>Error</div>;

  const { setGame } = contextVal;

  const handleClick = () => {
    setGame((prev) => !prev);
  };

  return (
    <div className='start-button' onClick={handleClick}>
      Start game
    </div>
  );
};
