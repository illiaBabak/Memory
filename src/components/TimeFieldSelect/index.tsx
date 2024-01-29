import { useContext } from 'react';
import { GlobalContext } from 'src/root';

export const TimeFieldSelect = (): JSX.Element => {
  const { time, setTime, setTimer } = useContext(GlobalContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
    setTimer(e.target.value);
  };

  return (
    <>
      <h2>Select time</h2>
      <select className='time-select' onChange={handleChange} value={time}>
        <option value='01:30'>01:30</option>
        <option value='01:00'>01:00</option>
        <option value='00:30'>00:30</option>
      </select>
    </>
  );
};
