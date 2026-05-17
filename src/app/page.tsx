// src/app/page.tsx
import { Suspense } from "react";
import MainPage from "@/src/components/main/MainPage";
import SkeletonGrid from "@/src/components/loading/SkeletonGrid";

export default function HomePage() {
  return (
    <div className="w-full space-y-6">
      <Suspense fallback={<SkeletonGrid cardsCount={12} />}>
        <MainPage ITEMS_PER_PAGE={12} />
      </Suspense>
    </div>
  );
}
