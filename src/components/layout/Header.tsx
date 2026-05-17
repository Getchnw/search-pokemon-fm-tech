import FilterButton from "../shared/FilterButton";
import SearchBar from "../shared/SearchBar";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
        Pokémon Search
      </h1>
      <div className="flex gap-1">
        <SearchBar />
        <FilterButton />
      </div>
    </div>
  );
};
export default Header;
