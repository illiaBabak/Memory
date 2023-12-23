import { createContext, useState } from 'react';
import './App.scss';
import { StartPage } from './components/StartPage';
import { ContainerCards } from './components/ContainerCards';

export const PropsStartPage = createContext<{ setGame: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);

export const App = (): JSX.Element => {
  const [isStartGame, setGame] = useState(false);

  return (
    <div className='container'>
      {!isStartGame ? (
        <PropsStartPage.Provider value={{ setGame }}>
          <StartPage />
        </PropsStartPage.Provider>
      ) : (
        <ContainerCards />
      )}
    </div>
  );
};
