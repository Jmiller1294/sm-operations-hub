import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchBar from '../components/searchbar';

const InventoryPage = () => {
  return (
    <div className="flex flex-col h-full w-full p-4">
      <SearchBar />
    </div>
  );
}

export default InventoryPage;