import { CardData } from 'src/types/Pokemon';

type Props = {
  name: string;
  imgId: number;
  index: number;
  setSelectedCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  isRotated: boolean;
  onClick: () => void;
  isLoseGame: boolean;
};

export const Card = ({ name, imgId, index, setSelectedCards, isRotated, onClick, isLoseGame }: Props): JSX.Element => {
  const handleClick = () => {
    setSelectedCards((prev) => {
      if (prev.length === 2) return prev;
      return [...prev, { name, index }];
    });
    onClick();
  };

  return (
    <div className={`card ${isRotated ? '' : 'back-card'}`} onClick={isRotated || isLoseGame ? undefined : handleClick}>
      <p>{name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`} />
    </div>
  );
};
