import { useContext } from 'react';
import { GlobalContext } from 'src/root';

export const MemoryFieldSelect = (): JSX.Element => {
  const { setCountCards, countCards } = useContext(GlobalContext);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountCards(Number(e.target.value));
  };

  return (
    <>
      <h2>Select number of cards</h2>
      <select className='memory-select' onChange={handleSelect} value={countCards}>
        <option value='2'>2x2</option>
        <option value='4'>4x4</option>
        <option value='6'>6x6</option>
      </select>
    </>
  );
};
