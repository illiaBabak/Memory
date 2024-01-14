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