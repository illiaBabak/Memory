import { Pokemon } from 'src/types/Pokemon';

type DataType = {
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
  return !!data && typeof data === 'object' && 'results' in data && isPokemonArr(data.results);
};
