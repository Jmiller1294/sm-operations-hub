"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SubMenu = ({ title, Icon, subPaths, path, isExpanded }) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isExpanded) {
      setIsActive(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    console.log(pathname, path);

    
  }, [pathname]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <li>
      <div className={`${styles.icon_link} ${pathname === path ? styles.active : null}`}>
        <Link key={title} className={styles.link} href={path}>
          <Icon className={styles.link_icon} size={24} />
          <span className={styles.link_name}>{title}</span>
        </Link>
        {subPaths.length < 2 ? null : (
          <div className={styles.arrow}>
            {isActive ? (
              <IoIosArrowUp onClick={() => handleClick()} />
            ) : (
              <IoIosArrowDown onClick={() => handleClick()} />
            )}
          </div>
        )}
      </div>
      <ul
        className={`${styles.sub_menu} ${isExpanded ? "" : styles.blank} 
          ${isActive ? styles.show_menu : ""}
        `}
      >
        <span
          style={
            isExpanded
              ? { display: "none" }
              : { display: "block", fontSize: "18px" }
          }
        >
          {title}
        </span>
        {subPaths.map(({ title, path }, index: number) => {
          return (
            <li key={index}>
              <Link key={title} className={styles.sub_link} href={path}>
                <span className={styles.sub_link_name}>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default SubMenu;
