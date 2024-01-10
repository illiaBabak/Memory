import { useContext, useEffect, useState } from 'react';
import { Card } from '../Card';
import { PokemonsWithIndex } from 'src/types/Pokemon';
import { fetchPokemons } from 'src/api/fetchPokemons';
import { GlobalContext } from 'src/root';
import { Loader } from '../Loader';
import { shuffleArr } from 'src/utils/shuffleArr';

const CARD_SIZE = 152;

export const ContainerCards = (): JSX.Element => {
  const { countCards } = useContext(GlobalContext);
  const [data, setData] = useState<PokemonsWithIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<PokemonsWithIndex[]>([]);
  const [guessedCards, setGuessedCards] = useState<PokemonsWithIndex[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (data.length && guessedCards.length === data.length * 2) setShowAlert(true);

    if (selectedCards.length === 2) {
      const timeout = setTimeout(() => {
        const updatedData = data.map((pokemon) => ({
          ...pokemon,
          isRotated: true,
        }));

        setData(updatedData);
        setSelectedCards([]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [selectedCards, data, setData, setSelectedCards, guessedCards]);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonListSize = Math.pow(countCards, 2) / 2;
      setIsLoading(true);
      try {
        const pokemons = await fetchPokemons(pokemonListSize);

        const pokemonsWithIndexes = pokemons.map((pokemon, index) => ({
          ...pokemon,
          originalIndex: index,
        }));

        const randomPokemons = shuffleArr(pokemonsWithIndexes);

        setData(randomPokemons);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, [countCards]);

  if (isLoading) return <Loader />;

  return (
    <>
      {data.length ? (
        <>
          <div className='container-cards' style={{ width: `${CARD_SIZE * countCards}px` }}>
            {data.map((pokemon) => (
              <Card
                name={pokemon.name}
                imgId={pokemon.originalIndex + 1}
                key={`list1-${pokemon.originalIndex}-${pokemon.name}`}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
                data={data}
                setGuessedCards={setGuessedCards}
                guessedCards={guessedCards}
              />
            ))}
            {data.map((pokemon) => (
              <Card
                name={pokemon.name}
                imgId={pokemon.originalIndex + 1}
                key={`list2-${pokemon.originalIndex}-${pokemon.name}`}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
                data={data}
                setGuessedCards={setGuessedCards}
                guessedCards={guessedCards}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='error'>Oops, something went wrong</div>
      )}

      {showAlert && <div className='custom-alert'>You won!</div>}
    </>
  );
};
