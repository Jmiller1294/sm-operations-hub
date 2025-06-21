import React from "react";
import styles from "../styles/Header.module.css";
import { IoMdMenu } from "react-icons/io";
import SearchBar from "./searchbar";

const Header = ({ onToggle }: any) => {
  return (
    <div className="relative w-full h-16">
      <div className="absolute top-0 right-0 w-full h-fit bg-white shadow-md flex items-center justify-between px-4">
        <IoMdMenu
          fontSize={30}
          onClick={() => onToggle()}
          className="cursor-pointer "
        />
        <div className="w-1/2 h-16 ml-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Header;


{/* <div className="sticky h-auto w-full  bg-red-500 items-center justify-between px-4">
<div className="w-full h-16 flex items-center justify-between">
  
  <IoMdMenu
    fontSize={30}
    onClick={() => onToggle()}
    className="cursor-pointer "
  />


  <div className="w-1/3 ml-auto">
    <SearchBar />
  </div>
</div>
</div> */}