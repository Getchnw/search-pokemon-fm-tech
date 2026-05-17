"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Filter, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const POKEMON_TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Fairy",
];

export default function FilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ดึงค่าธาตุที่ถูกเลือกในปัจจุบันจาก URL
  const currentType = searchParams.get("type") || "All";

  // ฟังก์ชันจัดการเมื่อเลือกธาตุใหม่
  const handleTypeSelect = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "All") {
      params.delete("type"); // ถ้าเลือก All ให้ลบพารามิเตอร์ออกจาก URL
    } else {
      params.set("type", type); // เซ็ตค่าธาตุเช่น ?type=Fire
    }
    params.set("page", "1");

    // ยิงไปให้ MainPage ทำการฟิลเตอร์ข้อมูลใหม่
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      {/* ปุ่มกดเปิดเมนู */}
      <DropdownMenuTrigger asChild>
        <Button
          variant={currentType !== "All" ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* รายการเมนูเลือกธาตุ */}
      <DropdownMenuContent
        align="end"
        className="w-48 max-h-80 overflow-y-auto bg-ui-surface border-ui-border"
      >
        <DropdownMenuLabel className="text-text-muted text-xs">
          Select Pokémon Type
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-ui-border" />

        {/* ตัวเลือกดั้งเดิม: ล้างฟิลเตอร์ทั้งหมด */}
        <DropdownMenuItem
          onClick={() => handleTypeSelect("All")}
          className="flex items-center justify-between cursor-pointer text-sm"
        >
          <span
            className={
              currentType === "All"
                ? "font-bold text-brand-primary"
                : "text-text-main"
            }
          >
            All Types
          </span>
          {currentType === "All" && (
            <Check className="w-4 h-4 text-brand-primary" />
          )}
        </DropdownMenuItem>

        {/* วนลูปพ่นธาตุทั้ง 16 ธาตุออกมาแสดงผล */}
        {POKEMON_TYPES.map((type) => {
          const isSelected = currentType === type;
          return (
            <DropdownMenuItem
              key={type}
              onClick={() => handleTypeSelect(type)}
              className="flex items-center justify-between cursor-pointer text-sm"
            >
              <span
                className={
                  isSelected ? "font-bold text-brand-primary" : "text-text-main"
                }
              >
                {type}
              </span>
              {isSelected && <Check className="w-4 h-4 text-brand-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
