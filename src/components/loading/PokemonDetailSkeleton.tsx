"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PokemonDetailSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
      {/* 🔙 ปุ่มย้อนกลับจำลอง */}
      <Skeleton className="h-9 w-28 bg-slate-200/80 dark:bg-slate-800 rounded-md" />

      {/* Layout 2 ฝั่ง ถอดแบบตามดีไซน์หลัก */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ================= ฝั่งซ้าย: ข้อมูลทั่วไปจำลอง ================= */}
        <div className="md:col-span-1 space-y-6">
          {/* กล่องรูปภาพและชื่อ */}
          <Card className="bg-ui-surface border-ui-border p-6 flex flex-col items-center text-center shadow-sm">
            <Skeleton className="h-4 w-12 bg-slate-200/80" />{" "}
            {/* เลขประจำตัว # */}
            <Skeleton className="w-40 h-40 rounded-full bg-slate-200/80 my-5" />{" "}
            {/* รูปภาพวงกลมหลอก */}
            <Skeleton className="h-7 w-32 bg-slate-200/80 mb-2" />{" "}
            {/* ชื่อโปเกมอน */}
            <Skeleton className="h-4 w-24 bg-slate-200/50 mb-5" />{" "}
            {/* คำอธิบายประเภท */}
            <div className="flex gap-1.5">
              <Skeleton className="h-6 w-16 bg-slate-200/80 rounded-md" />{" "}
              {/* แท็กธาตุที่ 1 */}
              <Skeleton className="h-6 w-16 bg-slate-200/80 rounded-md" />{" "}
              {/* แท็กธาตุที่ 2 */}
            </div>
          </Card>

          {/* กล่อง Base Stats จำลอง */}
          <Card className="bg-ui-surface border-ui-border p-4 shadow-sm space-y-4">
            <Skeleton className="h-4 w-20 bg-slate-200/80 pb-1 border-b" />{" "}
            {/* หัวข้อ Base Stats */}
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 bg-slate-200/50" />
              <Skeleton className="h-4 w-8 bg-slate-200/80" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 bg-slate-200/50" />
              <Skeleton className="h-4 w-8 bg-slate-200/80" />
            </div>
          </Card>
        </div>

        {/* ================= ฝั่งขวา: สกิลและสายพัฒนาจำลอง ================= */}
        <div className="md:col-span-2 space-y-6">
          {/* กล่องท่าโจมตี Attacks จำลอง */}
          <Card className="bg-ui-surface border-ui-border shadow-sm">
            <CardHeader className="border-b border-ui-border py-4">
              <Skeleton className="h-5 w-36 bg-slate-200/80" />{" "}
              {/* หัวข้อ Attacks */}
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Fast Moves */}
              <div>
                <Skeleton className="h-3 w-20 bg-slate-200/50 mb-3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Skeleton className="h-14 w-full bg-slate-200/60 rounded-lg" />
                  <Skeleton className="h-14 w-full bg-slate-200/60 rounded-lg" />
                </div>
              </div>
              {/* Special Moves */}
              <div>
                <Skeleton className="h-3 w-24 bg-slate-200/50 mb-3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Skeleton className="h-14 w-full bg-slate-200/60 rounded-lg" />
                  <Skeleton className="h-14 w-full bg-slate-200/60 rounded-lg" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* กล่อง Evolution Chain จำลอง */}
          <Card className="bg-ui-surface border-ui-border shadow-sm">
            <CardHeader className="border-b border-ui-border py-4">
              <Skeleton className="h-5 w-32 bg-slate-200/80" />{" "}
              {/* หัวข้อ Evolution */}
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                {/* ร่างที่ 1 */}
                <div className="flex flex-col items-center space-y-2 w-24">
                  <Skeleton className="w-16 h-16 rounded-xl bg-slate-200/60" />
                  <Skeleton className="h-3 w-8 bg-slate-200/40" />
                  <Skeleton className="h-3 w-16 bg-slate-200/80" />
                </div>
                {/* ลูกศรคั่น */}
                <div className="flex items-center pt-6">
                  <Skeleton className="h-4 w-4 bg-slate-200/40 rounded-full" />
                </div>
                {/* ร่างที่ 2 */}
                <div className="flex flex-col items-center space-y-2 w-24">
                  <Skeleton className="w-16 h-16 rounded-xl bg-slate-200/60" />
                  <Skeleton className="h-3 w-8 bg-slate-200/40" />
                  <Skeleton className="h-3 w-16 bg-slate-200/80" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
