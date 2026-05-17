import { Suspense } from "react";
import FilterButton from "../shared/FilterButton";
import SearchBar from "../shared/SearchBar";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
        Pokémon Search
      </h1>
      <Suspense
        fallback={
          <div className="h-9 w-48 bg-slate-100 animate-pulse rounded-md" />
        }
      >
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <SearchBar />
          <FilterButton />
        </div>
      </Suspense>
    </div>
  );
};
export default Header;
