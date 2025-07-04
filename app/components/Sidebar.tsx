import React from "react";
import styles from "../styles/Sidebar.module.css";
import SubMenu from "./SubMenu";
import dynamic from "next/dynamic";

const FaHome = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaHome),
  { ssr: false }
);
const FaCalendar = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaCalendar),
  { ssr: false }
);

const FaFolder = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaFolder),
  { ssr: false }
);

const FaBook = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaBook),
  { ssr: false }
);

const FaServicestack = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaServicestack),
  { ssr: false }
);

const IoSettingsSharp = dynamic(
  () => import("react-icons/io5").then((mod) => mod.IoSettingsSharp),
  { ssr: false }
);


const navList = [
  {
    icon: <FaHome size={22} />,
    title: "Home",
    path: "/home",
    subPaths: [],
  },
  {
    icon: <FaCalendar size={22} />,
    title: "Appointments",
    path: "/appointments",
    subPaths: [],
  },
  {
    icon: <FaBook size={22} />,
    title: "Quotes",
    path: "/quotes",
    subPaths: [
      { title: "Residential", path: "/quotes/residential" },
      { title: "Commercial", path: "/quotes/commercial" },
    ],
  },
  {
    icon: <FaFolder size={22} />,
    title: "Clients",
    path: "/clients",
    subPaths: [],
  },
  {
    icon: <FaServicestack size={22} />,
    title: "Services",
    path: "/services",
    subPaths: [],
  },
  {
    icon: <FaHome size={22} />,
    title: "Inventory",
    path: "/inventory",
    subPaths: [],
  },
  {
    icon: <FaHome size={22} />,
    title: "Booking",
    path: "/booking",
    subPaths: [
      { title: "Residential", path: "/quotes/residential" },
      { title: "Commercial", path: "/quotes/commercial" },
    ],
  },
  {
    icon: <IoSettingsSharp size={22} />,
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
              key={path}
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
