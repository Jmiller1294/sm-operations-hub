import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <div className="flex flex-row rounded-full border-gray-400 border-1 h-10 w-80 bg-gray-200 items-center p-2.5 text-sm">
      <label htmlFor="searchbar">
        <FaMagnifyingGlass size={18} />
      </label>
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
