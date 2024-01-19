import { useContext, useEffect, useState } from 'react';
import { Card } from '../Card';
import { CardData, PokemonsWithIndex } from 'src/types/Pokemon';
import { fetchPokemons } from 'src/api/fetchPokemons';
import { GlobalContext } from 'src/root';
import { Loader } from '../Loader';
import { shuffleArr } from 'src/utils/shuffleArr';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../BackButton';

const CARD_SIZE = 152;

export const ContainerCards = (): JSX.Element => {
  const { boardSize, time, setTime } = useContext(GlobalContext);
  const [data, setData] = useState<PokemonsWithIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [guessedCards, setGuessedCards] = useState<CardData[]>([]);
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [timer, setTimer] = useState(time);
  const [isLoseGame, setIsLoseGame] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (data.length && guessedCards.length + selectedCards.length + 1 === data.length) setShouldShowAlert(true);
  };

  const retryGame = () => {
    setTimer(time);
    setShouldShowAlert(false);
    setIsLoseGame(false);
    setGuessedCards([]);
    setSelectedCards([]);
  };

  useEffect(() => {
    if (shouldShowAlert) return;

    let timeInSeconds = parseInt(timer.split(':')[0]) * 60 + parseInt(timer.split(':')[1]);

    const intervalId = setInterval(() => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setTimer(formattedTime);

      if (timeInSeconds > 0) timeInSeconds -= 1;
      else {
        setIsLoseGame(true);
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [timer, setTimer, shouldShowAlert]);

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
    setTimer(time);
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
  }, [boardSize, setTime, setTimer, time]);

  if (isLoading) return <Loader />;

  return (
    <>
      {data.length ? (
        <>
          <div className='timer'>{timer}</div>
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
                isLoseGame={isLoseGame}
              />
            ))}
          </div>
        </>
      ) : (
        navigate('/error')
      )}

      {shouldShowAlert && <div className='custom-alert'>You won!</div>}
      {isLoseGame && <div className='lose-alert'>You lose!</div>}

      <div className='retry-button' onClick={retryGame}>
        Retry
      </div>
      <BackButton />
    </>
  );
};
