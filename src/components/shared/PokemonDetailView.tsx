"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PokemonTypeBadge from "../shared/PokemonTypeBadge";
import { ArrowLeft, ArrowRight, Shield, Heart, Flame } from "lucide-react";
import PokemonDetailSkeleton from "../loading/PokemonDetailSkeleton";
import { PokemonDetailProps } from "@/src/type/pokemonDataType";

export default function PokemonDetailView({ pokemon }: PokemonDetailProps) {
  const router = useRouter();

  if (!pokemon) return <PokemonDetailSkeleton />; //แสดง Skeleton ขณะรอข้อมูล

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ปุ่มย้อนกลับหน้าแรก */}
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-text-muted hover:text-text-main"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to List</span>
      </Button>

      {/* Layout แบ่งเป็น 2 ฝั่ง ซ้าย (รูปภาพ+Stats) ขวา (ท่าโจมตี+ร่างวิวัฒนาการ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ================= ฝั่งซ้าย: ข้อมูลทั่วไป ================= */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-ui-surface border-ui-border p-6 flex flex-col items-center text-center shadow-sm">
            <span className="text-sm font-mono text-text-disabled">
              #{pokemon.number}
            </span>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-48 h-48 object-contain my-4"
            />
            <CardTitle className="text-2xl font-bold text-text-main mb-1">
              {pokemon.name}
            </CardTitle>
            <p className="text-xs text-text-muted italic mb-4">
              {pokemon.classification}
            </p>

            {/* แสดงแท็กธาตุ */}
            <PokemonTypeBadge types={pokemon.types} />
          </Card>

          {/* Stats Card */}
          <Card className="bg-ui-surface border-ui-border p-4 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-text-main border-b border-ui-border pb-2">
              Base Stats
            </h4>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-1.5 text-text-muted">
                <Heart className="text-red-500" /> Max HP
              </span>
              <span className="font-bold text-text-main">{pokemon.maxHP}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-1.5 text-text-muted">
                <Shield className="text-blue-500" /> Max CP
              </span>
              <span className="font-bold text-text-main">{pokemon.maxCP}</span>
            </div>
          </Card>
        </div>

        {/* ================= ฝั่งขวา: สกิลการต่อสู้และสายพัฒนา ================= */}
        <div className="md:col-span-2 space-y-6">
          {/* กล่องท่าโจมตี*/}
          <Card className="bg-ui-surface border-ui-border shadow-sm">
            <CardHeader className="border-b border-ui-border py-4">
              <CardTitle className="text-lg font-bold text-text-main flex items-center gap-2">
                <Flame className="text-brand-accent" /> Attacks & Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Fast Attacks */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  Fast Moves
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pokemon.attacks?.fast?.map((attack, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-ui-bg border border-ui-border rounded-lg text-sm"
                    >
                      <div>
                        <p className="font-bold text-text-main">
                          {attack.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          Type: {attack.type}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-brand-primary">
                        DMG {attack.damage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Attacks */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  Special Moves
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pokemon.attacks?.special?.map((attack, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-ui-bg border border-ui-border rounded-lg text-sm"
                    >
                      <div>
                        <p className="font-bold text-text-main">
                          {attack.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          Type: {attack.type}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-status-error">
                        DMG {attack.damage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ช่องแสดงร่างวิวัฒนาการ*/}
          <Card className="bg-ui-surface border-ui-border shadow-sm">
            <CardHeader className="border-b border-ui-border py-4">
              <CardTitle className="text-lg font-bold text-text-main">
                Evolution Chain
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
                  {pokemon.evolutions.map((evo, index) => (
                    <div key={evo.id} className="flex items-center gap-6">
                      {/* สัญลักษณ์ลูกศรชี้ไปหาร่างถัดไป (ยกเว้นร่างแรกสุด) */}
                      {index > 0 && (
                        <ArrowRight className="text-text-disabled" />
                      )}

                      {/* กล่องร่างพัฒนา ยุบใส่ปุ่มลิ้งก์ให้กดสลับหน้าได้ลื่นไหล */}
                      <button
                        onClick={() =>
                          router.push(`/pokemon/${evo.name.toLowerCase()}`)
                        }
                        className="flex flex-col items-center p-3 rounded-xl border border-dashed border-ui-border hover:border-brand-primary hover:bg-slate-50 transition-all text-center group w-28"
                      >
                        <img
                          src={evo.image}
                          alt={evo.name}
                          className="w-16 h-16 object-contain mb-2 group-hover:scale-105 transition-transform"
                        />
                        <span className="text-xs font-mono text-text-disabled">
                          #{evo.number}
                        </span>
                        <span className="text-xs font-bold text-text-main group-hover:text-brand-primary truncate w-full">
                          {evo.name}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted italic text-center py-4">
                  โปเกมอนตัวนี้เป็นร่างสูงสุดแล้ว ไม่สามารถวิวัฒนาการต่อได้
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
