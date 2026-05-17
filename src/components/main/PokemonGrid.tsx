"use client";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemons: any[];
  onViewMore: (name: string) => void;
}

export default function PokemonGrid({
  pokemons,
  onViewMore,
}: PokemonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onViewMore={onViewMore}
        />
      ))}
    </div>
  );
}
