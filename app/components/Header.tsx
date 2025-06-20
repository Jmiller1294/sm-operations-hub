import React from "react";
import styles from "../styles/Header.module.css";
import { IoMdMenu } from "react-icons/io";
import SearchBar from "./searchbar";

const Header = ({onToggle}:any) => {
  return (
    <div className={styles.container}>
      <IoMdMenu fontSize={30} onClick={() => onToggle()}/>
      <div className="ml-auto"></div><SearchBar />
    </div>
  );
};

export default Header;
