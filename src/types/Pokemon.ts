export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonsWithIndex = Pokemon & {
  originalIndex: number;
};
