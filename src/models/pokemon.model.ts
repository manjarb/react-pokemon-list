export interface PokemonListResult {
  name: string;
  url: string;
  image?: string;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonListResult[];
}
