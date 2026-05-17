"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PokemonTypeBadge from "@/src/components/shared/PokemonTypeBadge";

interface PokemonCardProps {
  pokemon: {
    name: string;
    number: string;
    types: string[];
    image: string;
  };
  onViewMore: (name: string) => void;
}

export default function PokemonCard({ pokemon, onViewMore }: PokemonCardProps) {
  return (
    // 🌟 ใช้ Card ของ shadcn ควบคุมเงา กรอบ และพื้นหลังอัตโนมัติ
    <Card className="hover:shadow-md transition-shadow flex flex-col items-center p-4 bg-ui-surface border-ui-border text-center">
      <CardHeader className="p-0 w-full flex justify-start">
        <span className="text-xs font-mono text-text-disabled text-left">
          #{pokemon.number}
        </span>
      </CardHeader>

      <CardContent className="p-0 flex flex-col items-center my-3">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain mb-3"
        />
        <CardTitle className="text-lg font-bold text-text-main mb-2">
          {pokemon.name}
        </CardTitle>

        {/* Component จัดการธาตุและไอคอนที่เราทำไว้ */}
        <PokemonTypeBadge types={pokemon.types} />
      </CardContent>

      <Button
        variant="outline"
        onClick={() => onViewMore(pokemon.name)}
        className="w-full text-xs font-semibold hover:bg-brand-primary hover:text-white transition-colors"
      >
        View More
      </Button>
    </Card>
  );
}
