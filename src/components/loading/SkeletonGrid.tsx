"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface SkeletonGridProps {
  cardsCount?: number;
}

export default function SkeletonGrid({ cardsCount = 12 }: SkeletonGridProps) {
  const skeletonCards = Array.from({ length: cardsCount });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full animate-pulse">
      {skeletonCards.map((_, index) => (
        <Card
          key={index}
          className="flex flex-col items-center p-4 bg-ui-surface border-ui-border text-center h-[290px]"
        >
          {/* ส่วนหัว จำลองรหัส Pokemon */}
          <CardHeader className="p-0 w-full flex justify-start">
            <Skeleton className="h-3 w-10 bg-slate-200" />
          </CardHeader>

          {/* ส่วนเนื้อหา */}
          <CardContent className="p-0 flex flex-col items-center my-3 w-full flex-grow">
            {/* จำลองรูปภาพโปเกมอน */}
            <Skeleton className="w-24 h-24 rounded-full bg-slate-200 mb-4" />

            {/* จำลองชื่อโปเกมอน */}
            <Skeleton className="h-5 w-2/3 bg-slate-200 mb-3" />

            {/* จำลอง PokemonTypeBadge */}
            <div className="flex gap-1.5 justify-center w-full">
              <Skeleton className="h-5 w-14 rounded-md bg-slate-200" />
              <Skeleton className="h-5 w-14 rounded-md bg-slate-200" />
            </div>
          </CardContent>

          {/* จำลองปุ่ม View More */}
          <CardFooter className="p-0 w-full mt-auto">
            <Skeleton className="h-9 w-full rounded-md bg-slate-200" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
