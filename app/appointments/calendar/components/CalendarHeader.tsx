"use client";
import React, { useContext, useEffect } from "react";
import styles from "../../../styles/Calendar.module.css";
import { Employee } from "@/app/types/types";
import { addDays, eachDayOfInterval, format, startOfWeek } from "date-fns";
import { usePathname, useSearchParams } from "next/navigation";
import AppointmentsContext from "@/app/store/appointments-context";

const CalendarHeader = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const date = Date.now();
  const pathname = usePathname();
  const searchParams = useSearchParams();
    const { employees } =
      useContext(AppointmentsContext);

  const getDaysOfWeek = () => {
    let currDate: string | number = date;
    if (searchParams.get("date")) {
      currDate = searchParams.get("date") as string;
    }
    const weekStart = startOfWeek(currDate, { weekStartsOn: 1 });
    const weekDates = eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    });
    return [...weekDates];
  };

  const renderView = () => {
    switch (pathname) {
      case "/appointments/calendar/day":
        return (
          <div className={styles.employeeInfoCon}>
            <div className={styles.timeTextCon}>Time</div>
            <div className={styles.employeesCon}>
              {employees?.map((employee: Employee, index: number) => (
                <div key={index} className={styles.employeeCon}>
                  {employee.name}
                </div>
              ))}
            </div>
          </div>
        );
      case "/appointments/calendar/week":
        return (
          <div className={styles.employeeInfoCon}>
            <div className={styles.timeTextCon}>
              <span>Time</span>
            </div>
            <div className={styles.DaysCon}>
              {getDaysOfWeek().map((day: Date, index: number) => (
                <div
                  key={index}
                  className={`${styles.DayCon} 
                     ${
                       format(day, "EEEE, MMM d") ===
                       format(date, "EEEE, MMM d")
                         ? styles.borderBottom
                         : null
                     }
                    `}
                >
                  {format(day, "EEEE, MMM d")}
                </div>
              ))}
            </div>
          </div>
        );
      case "/appointments/calendar/month":
        return null;
      case "/appointments":
        return (
          <div className={styles.employeeInfoCon}>
            <div className={styles.timeTextCon}>Time</div>
            <div className={styles.employeesCon}>
              {employees?.map((employee: Employee, index: number) => (
                <div key={index} className={styles.employeeCon}>
                  {employee.name}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return <div>{renderView()}</div>;
};

export default CalendarHeader;
