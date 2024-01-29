import { useContext, useEffect, useReducer } from 'react';
import { Card } from '../Card';
import { fetchPokemons } from 'src/api/fetchPokemons';
import { GlobalContext } from 'src/root';
import { Loader } from '../Loader';
import { shuffleArr } from 'src/utils/shuffleArr';
import { Navigate } from 'react-router-dom';
import { BackButton } from '../BackButton';
import { Statistics } from '../Statistics';
import Confetti from 'react-confetti';
import { GameState } from 'src/types/Pokemon';

const initialState = {
  data: [],
  isLoading: true,
  selectedCards: [],
  guessedCards: [],
  moves: 0,
  misses: 0,
  score: 0,
  roundsPlayed: Number(sessionStorage.getItem('rounds_played') ?? 0),
  shouldShowConfetti: false,
  confettiOpacity: 1,
};



const reducer = (state: GameState, updatedVal: Partial<GameState>): GameState => ({ ...state, ...updatedVal });

const CARD_SIZE = 140;

type Props = {
  setAlertText: React.Dispatch<React.SetStateAction<'lose' | 'won' | null>>;
  timer: string;
  alertText: 'lose' | 'won' | null;
  onGameStart: (initialTime?: string) => void;
  isGameStarted: boolean;
  oldIntervalId: React.MutableRefObject<NodeJS.Timeout | null>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ContainerCards = ({
  setAlertText,
  timer,
  alertText,
  onGameStart,
  isGameStarted,
  oldIntervalId,
  setIsGameStarted,
}: Props): JSX.Element => {
  const { boardSize, time, setTimer } = useContext(GlobalContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const decreaseOpacity = () => {
    if (state.confettiOpacity <= 0) return;

    dispatch({ confettiOpacity: state.confettiOpacity - 0.1 });
    setTimeout(decreaseOpacity, 300);
  };

  const handleWin = (updatedData: Partial<GameState>) => {
    const { score, shouldShowConfetti, roundsPlayed } = state;
    const hasWinSession = score === 3;

    setTimer(time);
    setAlertText('won');

    oldIntervalId.current && clearInterval(oldIntervalId.current);
    oldIntervalId.current = null;
    updatedData.score = score + 1;
    updatedData.roundsPlayed = roundsPlayed + 1;

    sessionStorage.setItem('rounds_played', JSON.stringify(roundsPlayed + 1));

    if (!hasWinSession) return;

    updatedData.score = 0;
    updatedData.shouldShowConfetti = !shouldShowConfetti;

    decreaseOpacity();

    setTimeout(() => {
      dispatch({ confettiOpacity: 0, shouldShowConfetti: false });
    }, 3000);
  };

  const handleCardClick = (name: string, index: number) => {
    const updatedData: Partial<GameState> = {};
    const { selectedCards, moves, data, guessedCards, misses } = state;

    const hasSelectedCard = selectedCards.length === 1;
    const isWin = guessedCards.length + selectedCards.length + 1 === data.length;

    if (hasSelectedCard) {
      updatedData.moves = moves + 1;

      if (selectedCards[0].name !== name) {
        updatedData.misses = misses + 1;

        setTimeout(() => {
          dispatch({ selectedCards: [] });
        }, 1000);
      }
    }

    if (hasSelectedCard && selectedCards[0].name === name) {
      updatedData.selectedCards = [];
      updatedData.guessedCards = [...guessedCards, ...selectedCards, { name, index }];
    } else updatedData.selectedCards = selectedCards.length === 2 ? selectedCards : [...selectedCards, { name, index }];

    if (isWin) handleWin(updatedData);

    dispatch(updatedData);
  };

  const retryGame = () => {
    dispatch({ moves: 0, misses: 0, guessedCards: [], selectedCards: [] });
    setAlertText(null);
    setIsGameStarted(true);
    onGameStart(time);
  };

  useEffect(() => {
    setTimer(time);
    const loadPokemons = async () => {
      const pokemonListSize = Math.pow(boardSize, 2) / 2;
      dispatch({ isLoading: true });

      try {
        const pokemons = await fetchPokemons(pokemonListSize);

        const pokemonsWithIndexes = pokemons.map((pokemon, index) => ({
          ...pokemon,
          originalIndex: index,
        }));

        dispatch({ data: shuffleArr([...pokemonsWithIndexes, ...pokemonsWithIndexes]) });
      } finally {
        dispatch({ isLoading: false });
      }
    };

    loadPokemons();
  }, [boardSize, setTimer, time]);

  if (state.isLoading) return <Loader />;

  if (!state.data.length) return <Navigate to='/error' />;

  return (
    <>
      <div className='timer'>{timer}</div>
      <div className='container-cards' style={{ width: `${CARD_SIZE * boardSize}px` }}>
        {state.data.map((pokemon, index) => (
          <Card
            name={pokemon.name}
            imgId={pokemon.originalIndex + 1}
            index={index}
            key={`card-${index}-${pokemon.name}`}
            isRotated={[...state.guessedCards, ...state.selectedCards].some(
              (card) => card.name === pokemon.name && card.index === index
            )}
            onClick={handleCardClick}
            isLoseGame={alertText === 'lose'}
            isGameStarted={isGameStarted}
          />
        ))}
      </div>

      {alertText === 'won' && <div className='custom-alert'>You won!</div>}
      {alertText === 'lose' && <div className='lose-alert'>You lose!</div>}

      {state.shouldShowConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={180}
          opacity={state.confettiOpacity}
          className='confetti'
        />
      )}

      <Statistics state={state} />

      <div className='retry-button' onClick={retryGame}>
        Start
      </div>
      <BackButton retryGame={retryGame} />
    </>
  );
};
