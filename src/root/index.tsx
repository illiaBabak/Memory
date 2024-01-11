import { createContext, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';

type GlobalContextType = {
  setCountCards: React.Dispatch<React.SetStateAction<number>>;
  countCards: number;
};

export const GlobalContext = createContext<GlobalContextType>({
  setCountCards: () => {
    throw new Error('Global context is not initialized');
  },
  countCards: 2,
});

export const App = (): JSX.Element => {
  const [countCards, setCountCards] = useState(2);

  return (
    <GlobalContext.Provider value={{ setCountCards, countCards }}>
      <div className='container'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </GlobalContext.Provider>
  );
};
