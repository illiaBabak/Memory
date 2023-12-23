export const MemoryFieldSelect = (): JSX.Element => {
  return (
    <select className='memory-select'>
      <option value='16'>4x4</option>
      <option value='64'>8x8</option>
      <option value='256'>16x16</option>
    </select>
  );
};
