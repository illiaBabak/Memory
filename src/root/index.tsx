import { createContext, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContainerCards } from 'src/components/ContainerCards';
import { ErrorPage } from 'src/components/ErrorPage';
import { StartPage } from 'src/components/StartPage';

type GlobalContextType = {
  setBoardSize: React.Dispatch<React.SetStateAction<number>>;
  boardSize: number;
  setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isLightTheme: boolean;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setTimer: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  setBoardSize: () => {
    throw new Error('Global context is not initialized');
  },
  boardSize: 2,
  setIsLightTheme: () => {
    throw new Error('Global context is not initialized');
  },
  isLightTheme: false,
  time: '01:30',
  setTime: () => {
    throw new Error('Global context is not initialized');
  },
  setTimer: () => {
    throw new Error('Global context is not initialized');
  },
});

export const App = (): JSX.Element => {
  const [boardSize, setBoardSize] = useState(2);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [time, setTime] = useState('01:30');
  const [timer, setTimer] = useState('01:30');
  const [alertText, setAlertText] = useState<'lose' | 'won' | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const oldIntervalId = useRef<NodeJS.Timeout | null>(null);

  const onTimerChange = (initialTime?: string) => {
    setIsGameStarted(true);

    if (oldIntervalId.current) {
      clearInterval(oldIntervalId.current);
      oldIntervalId.current = null;
    }

    if (initialTime) setTimer(initialTime);

    const splitedTime = (initialTime ?? timer).split(':');
    let timeInSeconds = Number(splitedTime[0]) * 60 + Number(splitedTime[1]);

    const intervalId = setInterval(() => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setTimer(formattedTime);

      if (timeInSeconds > 0) timeInSeconds -= 1;
      else {
        setAlertText('lose');
        oldIntervalId.current && clearInterval(oldIntervalId.current);
        oldIntervalId.current = null;
        clearInterval(intervalId);
        setIsGameStarted(false);
      }
    }, 1000);
    oldIntervalId.current = intervalId;
  };

  return (
    <GlobalContext.Provider value={{ setBoardSize, boardSize, setIsLightTheme, isLightTheme, time, setTime, setTimer }}>
      <div className={`container ${isLightTheme ? 'black' : 'light'}`}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Navigate to='/start-page' />} />
            <Route path='/start-page' element={<StartPage onGameStart={onTimerChange} />} />
            <Route
              path='/cards'
              element={
                <ContainerCards
                  setAlertText={setAlertText}
                  timer={timer}
                  alertText={alertText}
                  onGameStart={onTimerChange}
                  isGameStarted={isGameStarted}
                  oldIntervalId={oldIntervalId}
                  setIsGameStarted={setIsGameStarted}
                />
              }
            />
            <Route path='/error' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
};
