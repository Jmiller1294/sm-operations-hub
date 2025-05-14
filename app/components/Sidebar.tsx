import React from "react";
import styles from "../styles/Sidebar.module.css";
import {
  FaBook,
  FaCalendar,
  FaFolder,
  FaHome,
  FaServicestack,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
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
    path: "/appointments",
    subPaths: [],
  },
  {
    icon: FaBook,
    title: "Quotes",
    path: "/quotes",
    subPaths: [
      { title: "Residential", path: "/quotes/residential" },
      { title: "Commercial", path: "/quotes/commercial" },
    ],
  },
  {
    icon: FaFolder,
    title: "Scheduling",
    path: "/scheduling",
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

// const HiSparkles = dynamic(
//   () => import("react-icons/hi2").then((mod) => mod.HiSparkles),
//   { ssr: false }
// );

const Sidebar = ({ isExpanded }) => {
  return (
    <aside className={`${styles.sidebar} ${isExpanded ? "" : styles.close}`}>
      <div className={styles.logo_details}>
        <span className={styles.logo}>
    
        </span>
        <span className={styles.logo_name}>Shine Masters</span>
      </div>
      <ul className={styles.nav_links}>
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
