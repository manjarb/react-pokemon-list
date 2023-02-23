export interface PokemonGeneralData {
  name: string;
  url: string;
}

export interface PokemonListResult extends PokemonGeneralData {
  image?: string;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonListResult[];
}

export interface PokemonAbility {
  ability: PokemonGeneralData;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: PokemonGeneralData;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonGeneralData;
}

export interface PokemonType {
  slot: number;
  type: PokemonGeneralData;
}

export interface Pokemon {
  id: number;
  name: string; //
  height: number; //
  weight: number; //
  abilities: PokemonAbility[]; //
  moves: PokemonMove[];
  sprites: {
    front_default: string;
    back_default: string;
  }; //
  stats: PokemonStat[]; //
  types: PokemonType[]; //
}
