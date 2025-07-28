import React from "react";
import styles from "../styles/Header.module.css";
import { IoMdMenu } from "react-icons/io";
import SearchBar from "./Searchbar";

const Header = ({ onToggle, isExpanded }: any) => {
  return (
    <div className={`${styles.container}  ${isExpanded ? "" : styles.closed}`}>
      <IoMdMenu fontSize={30} onClick={() => onToggle()} />
      <div className="ml-auto mr-auto">
        <SearchBar />
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