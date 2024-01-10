import { PokemonsWithIndex } from 'src/types/Pokemon';

export const shuffleArr = (array: PokemonsWithIndex[]): PokemonsWithIndex[] => {
  const shuffledArray = [...array];

  shuffledArray.sort(() => Math.random() - 0.5);

  return shuffledArray;
};
