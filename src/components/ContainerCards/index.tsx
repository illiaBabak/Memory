import { useContext, useEffect, useState } from 'react';
import { Card } from '../Card';
import { Pokemon } from 'src/types/Pokemon';
import { fetchPokemons } from 'src/api/fetchPokemons';
import { GlobalContext } from 'src/root';
import { Loader } from '../Loader';

const CARD_SIZE = 152;

export const ContainerCards = (): JSX.Element => {
  const { countCards } = useContext(GlobalContext);
  const [data, setData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonListSize = Math.pow(countCards, 2) / 2;
      setIsLoading(true);
      try {
        const pokemons = await fetchPokemons(pokemonListSize);
        setData(pokemons);
      } catch {
        // eslint-disable-next-line no-empty
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, [countCards]);

  // const test = data.findIndex((pokemon) => pokemon.name === 'venusaur');

  if (isLoading) return <Loader />;

  return (
    <div className='container-cards' style={{ width: `${CARD_SIZE * countCards}px` }}>
      {data.map((pokemon, index) => (
        <Card name={pokemon.name} imgId={index + 1} key={`list1-${index}-${pokemon.name}`} />
      ))}
      {data.map((pokemon, index) => (
        <Card name={pokemon.name} imgId={index + 1} key={`list2-${index}-${pokemon.name}`} />
      ))}
    </div>
  );
};
