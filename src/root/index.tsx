import { createContext, useState } from 'react';
import { StartPage } from '../components/StartPage';
import { ContainerCards } from '../components/ContainerCards';

type GlobalContextType = {
  setCountCards: React.Dispatch<React.SetStateAction<number>>;
  countCards: number;
  setIsStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  setCountCards: () => {
    throw new Error('Global context is not initialized');
  },
  countCards: 2,
  setIsStartGame: () => {
    throw new Error('Global context is not initialized');
  },
});

export const App = (): JSX.Element => {
  const [isStartGame, setIsStartGame] = useState(false);
  const [countCards, setCountCards] = useState(2);

  return (
    <GlobalContext.Provider value={{ setCountCards, countCards, setIsStartGame }}>
      <div className='container'>{!isStartGame ? <StartPage /> : <ContainerCards />}</div>
    </GlobalContext.Provider>
  );
};
