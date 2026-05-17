export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Evolution {
  id: string;
  number: string;
  name: string;
  image: string;
}

export interface PokemonAllprops {
  pokemons: {
    id: string;
    number: string;
    name: string;
    types: string[];
    image: string;
  }[];
}

export interface PokemonAllData {
  pokemons: {
    id: string;
    number: string;
    name: string;
    types: string[];
    image: string;
  }[];
}

export interface PokemonDetailData {
  pokemon: {
    number: string;
    name: string;
    classification: string;
    types: string[];
    maxCP: number;
    maxHP: number;
    image: string;
    attacks: {
      fast: Attack[];
      special: Attack[];
    };
    evolutions: Evolution[] | null;
  } | null;
}

export interface PokemonDetailProps {
  pokemon: {
    number: string;
    name: string;
    classification: string;
    types: string[];
    maxCP: number;
    maxHP: number;
    image: string;
    attacks: {
      fast: Attack[];
      special: Attack[];
    };
    evolutions: Evolution[] | null;
  };
}
