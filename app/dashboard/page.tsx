import React from "react";
import styles from "../styles/DashboardPage.module.css";
import DashboardCard from "./components/DashboardCard";

const DashboardPage = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles.row}>
        <DashboardCard size={"small"}>
          <div>Jobs Today</div>
        </DashboardCard>
        <DashboardCard size={"small"}>
          <div>Active Cleaners</div>
        </DashboardCard>
        <DashboardCard size={"small"}>
          <div>Pending Requests</div>
        </DashboardCard>
        <DashboardCard size={"small"}>
          <div>Revenue Overview</div>
        </DashboardCard>
      </div>
      <div className={styles.row}>
        <DashboardCard size={"large"}>
          <div>Upcoming Jobs & Schedule</div>
        </DashboardCard>
        <DashboardCard size={"large"}>
          <div>Cleaner Activity & Location Tracking</div>
        </DashboardCard>
        <DashboardCard size={"medium"}>Apps</DashboardCard>
      </div>
      <div className={styles.row}>
        <DashboardCard size={"xlarge"}>
          Revenue & Financial Overview
        </DashboardCard>
        <DashboardCard size={"xlarge"}>Inventory Overview</DashboardCard>
      </div>
    </div>
  );
};

export default DashboardPage;
