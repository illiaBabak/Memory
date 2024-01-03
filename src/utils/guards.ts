import { Pokemon } from 'src/types/Pokemon';

type DataType = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

const isPokemon = (data: unknown): data is Pokemon => {
  return (
    !!data &&
    typeof data === 'object' &&
    'name' in data &&
    'url' in data &&
    typeof data.name === 'string' &&
    typeof data.url === 'string'
  );
};

const isPokemonArr = (data: unknown): data is Pokemon[] => {
  return Array.isArray(data) && data.every((el) => isPokemon(el));
};

export const isPokemonsData = (data: unknown): data is DataType => {
  return (
    !!data &&
    typeof data === 'object' &&
    'count' in data &&
    'next' in data &&
    'previous' in data &&
    'results' in data &&
    typeof data.count === 'number' &&
    typeof data.next === 'string' &&
    data.previous === null &&
    isPokemonArr(data.results)
  );
};
