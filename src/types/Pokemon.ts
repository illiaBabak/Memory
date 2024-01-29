export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonsWithIndex = Pokemon & {
  originalIndex: number;
};

export type CardData = {
  name: string;
  index: number;
}

export type GameState = {
  data: PokemonsWithIndex[];
  isLoading: boolean;
  selectedCards: CardData[];
  guessedCards: CardData[];
  moves: number;
  misses: number;
  score: number;
  roundsPlayed: number;
  shouldShowConfetti: boolean;
  confettiOpacity: number;
};