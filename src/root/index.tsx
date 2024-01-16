import { createContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContainerCards } from 'src/components/ContainerCards';
import { StartPage } from 'src/components/StartPage';

type GlobalContextType = {
  setBoardSize: React.Dispatch<React.SetStateAction<number>>;
  boardSize: number;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
};

export const GlobalContext = createContext<GlobalContextType>({
  setBoardSize: () => {
    throw new Error('Global context is not initialized');
  },
  boardSize: 2,
  setTheme: () => {
    throw new Error('Global context is not initialized');
  },
  theme: false,
});

export const App = (): JSX.Element => {
  const [boardSize, setBoardSize] = useState(2);
  const [theme, setTheme] = useState(false);

  return (
    <GlobalContext.Provider value={{ setBoardSize, boardSize, setTheme, theme }}>
      <div className={`container ${theme ? 'black' : 'light'}`}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Navigate to='/start-page' />} />
            <Route path='/start-page' element={<StartPage />} />
            <Route path='/cards' element={<ContainerCards />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
};
