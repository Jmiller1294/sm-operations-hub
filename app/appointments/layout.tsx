import React, { Suspense } from "react";
import Header from "./components/Header";
import { getAvailability } from "../lib/availibility";
import { getAppointments } from "../lib/appointments";
import { getEmployees } from "../lib/employees";
import { AppointmentsProvider } from "../store/appointments-context";
import { Appointment } from "../types/types";
import { LayoutProps } from "@/.next/types/app/layout";
import styles from "../styles/loading.module.css";

const AppointmentsPageLayout = async ({ children }: LayoutProps) => {
  const [availibility, appointments, employees] = await Promise.all([
    getAvailability(),
    getAppointments(),
    getEmployees(),
  ]);

  return (
    <AppointmentsProvider
      appointments={appointments}
      availability={availibility}
      employees={employees}
    >
      <Suspense
        fallback={
          <div className={styles.container}>
            <div className={styles.spinner}></div>
          </div>
        }
      >
        <Header />
        {children}
      </Suspense>
    </AppointmentsProvider>
  );
};

export default AppointmentsPageLayout;
