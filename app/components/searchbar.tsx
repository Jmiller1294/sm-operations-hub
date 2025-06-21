import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <div className="flex w-1/3 items-center rounded-full border border-gray-400 h-10 bg-gray-200 px-3 text-sm">
      <FaMagnifyingGlass size={18} />
      <input
        id="searchbar"
        name="searchbar"
        className="flex-grow h-full ml-2 bg-transparent focus:outline-none truncate"
        type="search"
        placeholder="Search inventory"
      />
    </div>
  );
};

export default SearchBar;
