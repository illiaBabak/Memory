type Props = {
  name: string;
  imgId: number;
  index: number;
  isRotated: boolean;
  onClick: (name: string, index: number) => void;
  isLoseGame: boolean;
  isGameStarted: boolean;
};

export const Card = ({ name, imgId, index, isRotated, onClick, isLoseGame, isGameStarted }: Props): JSX.Element => {
  const isCardDisabled = isLoseGame || !isGameStarted;

  return (
    <div
      className={`card ${isRotated ? '' : 'back-card'} ${isCardDisabled ? 'disabled' : ''}`}
      onClick={isRotated || isCardDisabled ? undefined : () => onClick(name, index)}
    >
      <p>{name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`} />
    </div>
  );
};
