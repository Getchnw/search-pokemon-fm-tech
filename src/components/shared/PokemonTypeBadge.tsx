"use client";

import { Badge } from "@/components/ui/badge";

const TYPE_CLASSES: Record<string, string> = {
  Grass: "bg-type-grass text-white",
  Poison: "bg-type-poison text-white",
  Fire: "bg-type-fire text-white",
  Water: "bg-type-water text-white",
  Flying: "bg-type-flying text-white",
  Bug: "bg-type-bug text-white",
  Normal: "bg-type-normal text-white",
  Electric: "bg-type-electric text-slate-900", // ใช้ตัวอักษรเข้มเพื่อให้สมดุลกับพื้นหลังเหลือง
  Ground: "bg-type-ground text-white",
  Fairy: "bg-type-fairy text-white",
  Psychic: "bg-type-psychic text-white",
  Fighting: "bg-type-fighting text-white",
  Rock: "bg-type-rock text-white",
  Ghost: "bg-type-ghost text-white",
  Ice: "bg-type-ice text-slate-900",
  Dragon: "bg-type-dragon text-white",
};

interface PokemonTypeBadgeProps {
  types: string[]; // รับอาร์เรย์ของธาตุจากตัวการ์ดหลัก หรือหน้าดีเทล
}

export default function PokemonTypeBadge({ types }: PokemonTypeBadgeProps) {
  if (!types || types.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {types.map((type) => {
        // ดึงคลาสสีที่ผูกไว้ หากไม่เจอให้เซ็ตเป็นสีเทากลางมาตรฐาน (Fallback)
        const colorStyle = TYPE_CLASSES[type] || "bg-slate-400 text-white";

        return (
          <Badge key={type} className={`${colorStyle}`}>
            {type}
          </Badge>
        );
      })}
    </div>
  );
}
