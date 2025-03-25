import React from "react";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import {
  FaBook,
  FaCalendar,
  FaFolder,
  FaHome,
  FaServicestack,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Accordion from "./Accordian";
import { HiSparkles } from "react-icons/hi2";
import SubMenu from "./SubMenu";

const navList = [
  {
    icon: FaHome,
    title: "Home",
    path: "/",
    subPaths: [],
  },
  {
    icon: FaCalendar,
    title: "Appointments",
    path: "/appointments/calendar",
    subPaths: [],
  },
  {
    icon: FaBook,
    title: "Quotes",
    path: "/",
    subPaths: [
      { title: "Residential", path: "/quotes/residential" },
      { title: "Commercial", path: "/quotes/commercial" },
    ],
  },
  {
    icon: FaFolder,
    title: "Scheduling",
    path: "/",
    subPaths: [],
  },
  {
    icon: FaServicestack,
    title: "Services",
    path: "/services",
    subPaths: [],
  },
  {
    icon: FaHome,
    title: "Inventory",
    path: "/inventory",
    subPaths: [],
  },
  {
    icon: FaHome,
    title: "Booking",
    path: "/booking",
    subPaths: [
      { title: "Residential", path: "/quotes/residential" },
      { title: "Commercial", path: "/quotes/commercial" },
    ],
  },
  {
    icon: IoSettingsSharp,
    title: "Settings",
    path: "/settings",
    subPaths: [],
  },
];

const Sidebar = ({ isExpanded }) => {
  return (
    <aside className={`${styles.sidebar} ${isExpanded ? "" : styles.close}`}>
      <div className={styles.logo_details}>
        <span className={styles.logo}>
          <HiSparkles />
        </span>
        <span className={styles.logo_name}>Shine Masters</span>
      </div>
      <ul className={`${styles.nav_links} ${styles.close}`}>
        {navList.map(({ title, icon: Icon, path, subPaths }) => {
          return (
            <SubMenu
              key={title}
              title={title}
              Icon={Icon}
              path={path}
              subPaths={subPaths}
              isExpanded={isExpanded}
            />
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
