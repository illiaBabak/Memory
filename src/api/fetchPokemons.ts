import { Pokemon } from 'src/types/Pokemon';
import { isPokemonsData } from 'src/utils/guards';

export const fetchPokemons = async (countCards: number): Promise<Pokemon[]> => {
  const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${countCards}`;

  try {
    const response = await fetch(URL);
    const pokemonsData: unknown = await response.json();

    if (isPokemonsData(pokemonsData)) {
      const { results } = pokemonsData;
      return results;
    } else throw new Error('Failed to fetch');
  } catch {
    throw new Error('Failed to fetch');
  }
};
