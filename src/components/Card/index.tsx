import { useEffect, useState } from 'react';
import { PokemonsWithIndex } from 'src/types/Pokemon';

type Props = {
  name: string;
  imgId: number;
  setSelectedCards: React.Dispatch<React.SetStateAction<PokemonsWithIndex[]>>;
  selectedCards: PokemonsWithIndex[];
  data: PokemonsWithIndex[];
  setGuessedCards: React.Dispatch<React.SetStateAction<PokemonsWithIndex[]>>;
  guessedCards: PokemonsWithIndex[];
};

export const Card = ({
  name,
  imgId,
  selectedCards,
  setSelectedCards,
  data,
  setGuessedCards,
  guessedCards,
}: Props): JSX.Element => {
  const [isRotated, setIsRotated] = useState(true);

  useEffect(() => {
    setIsRotated(true);
  }, [data]);

  useEffect(() => {
    const selectedPokemon = data.find((pokemon) => pokemon.name === name);
    if (!selectedPokemon) return;

    const isGuessed = guessedCards.some((guessedPokemon) => guessedPokemon.name === selectedPokemon.name);

    if (isGuessed) setIsRotated(false);
  }, [guessedCards, data, name]);

  const handleClick = () => {
    const selectedPokemon = data.find((pokemon) => pokemon.name === name);
    if (!selectedPokemon) return;

    const selectedPokemons = [...selectedCards, selectedPokemon];

    if (selectedPokemons.length == 2 && selectedPokemons.every((element, _, array) => element === array[0])) {
      setGuessedCards((prev) => [...prev, ...selectedPokemons]);
    }

    if (isRotated && selectedCards.length < 2 && selectedPokemon) {
      setIsRotated((prev) => !prev);
      setSelectedCards((prev) => [...prev, selectedPokemon]);
    }
  };

  return (
    <div className={`card ${isRotated ? 'back-card' : ''}`} onClick={isRotated ? handleClick : undefined}>
      <p>{name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`} />
    </div>
  );
};
