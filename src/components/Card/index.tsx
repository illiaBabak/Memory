type Props = {
  name: string;
  imgId: number;
};

export const Card = ({ name, imgId }: Props): JSX.Element => {
  return (
    <div className='card'>
      <p>{name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`} />
    </div>
  );
};
