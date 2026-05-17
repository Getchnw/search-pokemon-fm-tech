"use client";

import { use, useEffect } from "react";
import { GET_POKEMON_DETAILS } from "@/src/lib/graphql-queries";
import PokemonDetailView from "@/src/components/shared/PokemonDetailView";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@apollo/client/react/compiled";
import PokemonDetailSkeleton from "@/src/components/loading/PokemonDetailSkeleton";
import { PokemonDetailData } from "@/src/type/pokemonDataType";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export default function PokemonDetailPage({ params }: PokemonPageProps) {
  const router = useRouter();

  const resolvedParams = use(params);
  const pokemonName = decodeURIComponent(resolvedParams.name);
  const formattedName =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const { loading, error, data, refetch } = useQuery<PokemonDetailData>(
    GET_POKEMON_DETAILS,
    {
      variables: { name: formattedName },
      skip: !formattedName,
      fetchPolicy: "cache-first",
    },
  );

  /* 🚨 1. ดักจับสถานะ Error และสั่งพ่น Sonner Toast ทันที */
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch data!", {
        className: "bg-status-error-bg text-status-error border-none",
        description:
          error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ GraphQL",
        position: "bottom-right", // ดีดขึ้นมุมขวาล่างตามดีไซน์
        duration: 5000, // แสดงค้างไว้ 5 วินาที
      });
    }
  }, [error]);

  /* UI เมื่อเกิด Error */
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="w-full text-center py-12 bg-status-error-bg border border-status-error/30 rounded-xl flex flex-col items-center justify-center gap-4">
          <p className="text-status-error font-semibold text-lg">
            ไม่สามารถโหลดข้อมูลเชิงลึกของ {formattedName} ได้
          </p>
          <p className="text-text-muted text-sm max-w-md px-4">
            {error.message}
          </p>

          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft />
              <span>Back to List</span>
            </Button>

            {/* ปุ่มกดดึงข้อมูลใหม่อีกครั้ง (Refetch) */}
            <Button
              variant="default"
              onClick={() => {
                toast.info("กำลังพยายามเชื่อมต่อใหม่...");
                refetch();
              }}
              className="flex items-center gap-2 bg-brand-primary text-white hover:bg-brand-secondary"
            >
              <RefreshCcw />
              <span>Retry</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* สถานะระหว่างรอโหลด  */
  if (loading) {
    return <PokemonDetailSkeleton />;
  }

  /* 🔍 4. สถานะหาข้อมูลไม่พบ (Data Empty State) */
  if (!data || !data.pokemon) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 bg-ui-surface border border-ui-border rounded-xl space-y-4">
        <p className="text-text-muted text-lg font-medium">
          ไม่พบข้อมูลเชิงลึกของโปเกมอนชื่อ "{formattedName}"
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 hover:bg-brand-primary hover:text-white"
        >
          <ArrowLeft />
          <span>กลับสู่หน้าหลัก</span>
        </Button>
      </div>
    );
  }

  /* 🎉 5. สถานะทำงานปกติ (Success State) */
  return <PokemonDetailView pokemon={data.pokemon} />;
}
