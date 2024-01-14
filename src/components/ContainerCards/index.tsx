import { useContext, useEffect, useState } from 'react';
import { Card } from '../Card';
import { CardData, PokemonsWithIndex } from 'src/types/Pokemon';
import { fetchPokemons } from 'src/api/fetchPokemons';
import { GlobalContext } from 'src/root';
import { Loader } from '../Loader';
import { shuffleArr } from 'src/utils/shuffleArr';
import { useNavigate } from 'react-router-dom';

const CARD_SIZE = 152;

export const ContainerCards = (): JSX.Element => {
  const { boardSize } = useContext(GlobalContext);
  const [data, setData] = useState<PokemonsWithIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [guessedCards, setGuessedCards] = useState<CardData[]>([]);
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (data.length && guessedCards.length + selectedCards.length + 1 === data.length) setShouldShowAlert(true);
  };

  useEffect(() => {
    if (selectedCards.length < 2) return;

    if (selectedCards[0].name === selectedCards[1].name) {
      setGuessedCards((prev) => [...prev, ...selectedCards]);
      setSelectedCards([]);
      return;
    }

    const timeout = setTimeout(() => {
      setSelectedCards([]);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [selectedCards]);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonListSize = Math.pow(boardSize, 2) / 2;
      setIsLoading(true);

      try {
        const pokemons = await fetchPokemons(pokemonListSize);

        const pokemonsWithIndexes = pokemons.map((pokemon, index) => ({
          ...pokemon,
          originalIndex: index,
        }));

        setData([...shuffleArr(pokemonsWithIndexes), ...shuffleArr(pokemonsWithIndexes)]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, [boardSize]);

  if (isLoading) return <Loader />;

  return (
    <>
      {data.length ? (
        <>
          <div className='container-cards' style={{ width: `${CARD_SIZE * boardSize}px` }}>
            {data.map((pokemon, index) => (
              <Card
                name={pokemon.name}
                imgId={pokemon.originalIndex + 1}
                index={index}
                key={`card-${index}-${pokemon.name}`}
                setSelectedCards={setSelectedCards}
                isRotated={[...guessedCards, ...selectedCards].some(
                  (card) => card.name === pokemon.name && card.index === index
                )}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='error'>Oops, something went wrong</div>
      )}

      {shouldShowAlert && <div className='custom-alert'>You won!</div>}

      <div className='back' onClick={() => navigate('/')}>
        Back
      </div>
    </>
  );
};
