"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_ALL_POKEMONS } from "@/src/lib/graphql-queries";
import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";
import SkeletonGrid from "../loading/SkeletonGrid";
import { toast } from "sonner";
import { PokemonAllData } from "./../../type/pokemonDataType";

export default function MainPage({
  ITEMS_PER_PAGE,
}: {
  ITEMS_PER_PAGE: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. อ่านสถานะการค้นหา, Filter ธาตุ, และเลขหน้าปัจจุบันตรงจาก URL
  const searchTerm = searchParams.get("search") || "";
  const selectedType = searchParams.get("type") || "All";
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. ดึงข้อมูลโปเกมอนก้อนหลัก
  const { loading, error, data } = useQuery<PokemonAllData>(GET_ALL_POKEMONS, {
    variables: { first: 151 },
    fetchPolicy: "cache-first", // เช็ค Cache ก่อนแล้วค่อยไปยิงใหม่ถ
  });

  // 3. Filtering Logic
  // ใช้ useMemo จะคำนวณใหม่เมื่อข้อมูลหรือคำค้นหาเปลี่ยนเท่านั้น
  const filteredPokemons = useMemo(() => {
    if (!data?.pokemons) return [];

    const results = data.pokemons.filter((pokemon: any) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "All" || pokemon.types.includes(selectedType);
      return matchesName && matchesType;
    });

    if (searchTerm && results.length === 0 && !loading) {
      setTimeout(() => {
        toast.error("Pokémon Not Found!", {
          className: "bg-status-error-bg text-status-error border-none",
          description: `Could not find any results for "${searchTerm}" with type "${selectedType}".`,
          position: "bottom-right",
        });
      }, 500);
    }

    return results;
  }, [data, searchTerm, selectedType, loading, toast]);

  // 4. Pagination Logic
  const totalItems = filteredPokemons.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPokemons.slice(startIndex, endIndex);
  }, [filteredPokemons, currentPage]);

  // ฟังก์ชันสลับหน้า โดยการผลักค่าขึ้น URL Parameter
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };

  // ฟังก์ชันเมื่อผู้ใช้กดปุ่ม View More บนการ์ดโปเกมอน (เชื่อมต่อไปหน้ารายละเอียด)
  const handleViewMore = (name: string) => {
    router.push(`/pokemon/${name.toLowerCase()}`);
  };

  // 5. การจัดการ Render หน้าจอตามสถานะระบบ (State Rendering)
  if (error) {
    return (
      <div className="w-full text-center py-12 text-status-error font-semibold bg-status-error-bg border border-status-error rounded-xl">
        เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {loading ? (
        <SkeletonGrid cardsCount={ITEMS_PER_PAGE} />
      ) : filteredPokemons.length > 0 ? (
        <>
          {/* ส่วนแสดงรายการการ์ดแบบ Grid  */}
          <PokemonGrid
            pokemons={paginatedPokemons}
            onViewMore={handleViewMore}
          />

          {/* ส่วนปุ่มควบคุมการแบ่งหน้า Next / Prev */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        /* หาไม่เจอ */
        <div className="text-center py-16 bg-ui-surface border border-ui-border rounded-xl">
          <p className="text-text-muted text-lg font-medium">
            ไม่พบข้อมูลโปเกมอนที่ระบุ
          </p>
          <p className="text-text-disabled text-sm mt-1">
            ลองล้างช่องค้นหาหรือเปลี่ยนการ Filter ธาตุใหม่อีกครั้ง
          </p>
        </div>
      )}
    </div>
  );
}
