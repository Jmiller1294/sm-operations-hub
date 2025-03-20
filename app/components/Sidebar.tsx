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
import { FaGear, FaPerson } from "react-icons/fa6";
import { Item } from "../types/types";
import Accordion from "./Accordian";

const navList = [
  {
    icon: <FaHome size={24} />,
    title: "Home",
    path: "/",
    subPaths: [
      {
        title: "Home",
        path: "/",
      },
    ],
  },
  {
    icon: <FaCalendar size={24} />,
    title: "Appointments",
    path: "/appointments/calendar",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaBook size={24} />,
    title: "Quotes",
    path: "/",
    subPaths: [
      {
        title: "Residential",
        path: "/",
      },
      {
        title: "Commercial",
        path: "/",
      },
    ],
  },
  {
    icon: <FaFolder size={24} />,
    title: "Scheduling",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaPerson size={24} />,
    title: "Customers",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaPerson size={24} />,
    title: "Employees",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaServicestack size={24} />,
    title: "Services",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaHome size={24} />,
    title: "Inventory",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaHome size={24} />,
    title: "Booking",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaHome size={24} />,
    title: "Leads",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
  {
    icon: <FaGear size={24} />,
    title: "Settings",
    path: "/",
    subPaths: [
      {
        title: "",
        path: "/",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      {navList.map((item: Item, index: number) => {
        return (
          <div key={index} style={{ width: "100%" }}>
            <Accordion title={item.title} icon={item.icon}>
              {item.subPaths.map((subItem: any, idx: number) => {
                return (
                  <Link
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "2.2rem",
                      alignItems: "center",
                      color: "#FFFFFF",
                      textDecorationLine: "none",
                      paddingLeft: "10px",
                    }}
                    href={item.path}
                  >
                    {subItem.title}
                  </Link>
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
