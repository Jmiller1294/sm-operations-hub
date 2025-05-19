"use client";
import { useEffect, useState, useRef, useContext, useMemo, FC, useLayoutEffect } from "react";
import styles from "../../../styles/Calendar.module.css";
import { format, getHours, getMinutes, parse } from "date-fns";
import { Appointment, Availability, Employee } from "@/app/types/types";
import AppointmentsContext from "@/app/store/appointments-context";
import { useSearchParams } from "next/navigation";
import AppointmentInfo from "../../components/AppointmentInfo";
import { useModal } from "@/app/store/modal-context";

const PIXELS_PER_MIN = 1;        // 60 min = 60 px 
const LABEL_HEIGHT   = 60;       // first blank hour for padding

//Helper functions
const makeTimeSlots = () =>
  Array.from({ length: 24 }, (_, h) => {
    const hr = h % 12 || 12;
    return `${hr}:00 ${h >= 12 ? "pm" : "am"}`;
  });

const minsSinceMidnight = (d: Date) =>
  getHours(d) * 60 + getMinutes(d) + 180;

const startPixel = (iso: string) =>
  LABEL_HEIGHT + minsSinceMidnight(new Date(iso)) * PIXELS_PER_MIN;

const slotHeight = (durationMin: number) =>
  durationMin * PIXELS_PER_MIN;




const DayViewCalendar:FC = () => {
  const { appointments, availability, employees } =
    useContext(AppointmentsContext);
  const searchParams = useSearchParams();
  const currDateISO = searchParams.get("date") ?? new Date().toISOString();
  const currDate = new Date(currDateISO);
  const fullDayName = format(currDate, "EEEE");
  const dayAvail: Availability | undefined =
    availability.find(d => d.day === fullDayName);
  const { openModal, closeModal } = useModal();
  const [now, setNow] = useState(() => new Date());


  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

   const currentHourRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    requestAnimationFrame(() =>
      currentHourRef.current?.scrollIntoView({ block: "center" }),
    );
  }, []);

  const timeSlots = useMemo(makeTimeSlots, []);

  const appointmentsByEmployee = useMemo(() => {
    const dayKey = format(currDate, "MMMM dd, yyyy");
    return employees.reduce<Record<string, Appointment[]>>((acc, emp) => {
      acc[emp.name] =
        appointments.filter(
          a => a.calendar === emp.name && a.date === dayKey,
        ) ?? [];
      return acc;
    }, {});
  }, [employees, appointments, currDate]);

  if (!dayAvail) return null;
  if (!employees.length) return <p>No employees configured.</p>;

  
  return (
    <div className={styles.calendarContainer}>
      {/* moving “now” indicators */}
      <div
        className={styles.timeDot}
        style={{ top: LABEL_HEIGHT + minsSinceMidnight(now) - 5 }}
      />
      <div
        className={styles.timeLine}
        style={{ top: LABEL_HEIGHT + minsSinceMidnight(now) }}
      />

      {/* left time column */}
      <div className={styles.timeColumn}>
        {timeSlots.map((label, hr) => (
          <div
            key={hr}
            ref={hr === getHours(currDate) ? currentHourRef : undefined}
            className={styles.timeSlot}
          >
            {label}
          </div>
        ))}
      </div>

      {/* per-employee columns */}
      <div className={styles.column}>
        {employees.map(emp => {
          const empApps = appointmentsByEmployee[emp.name] ?? [];
          return (
            <div key={emp.name} className={styles.col}>
              {/* appointments */}
              {empApps.map(app => {
                const top = startPixel(app.datetime);
                const height = slotHeight(app.duration);
                const appStartHr = getHours(app.datetime);

                // skip if outside working window
                if (
                  appStartHr < parse(dayAvail.start_time, "H:mm", currDate).getHours() ||
                  appStartHr + app.duration / 60 >
                    parse(dayAvail.end_time, "H:mm", currDate).getHours()
                )
                  return null;

                return (
                  <button
                    key={app.id}
                    style={{ top, height }}
                    className={styles.appointment}
                    onClick={() =>
                      openModal(
                        <AppointmentInfo
                          data={app}
                          onClose={closeModal}
                        />,
                      )
                    }
                  >
                    <span className={styles.appointmentName}>
                      {app.first_name} {app.last_name}:&nbsp;
                    </span>
                    <span className={styles.appointmentType}>
                      {app.type}
                    </span>
                    <div>
                      {app.start_time} – {app.end_time}
                    </div>
                  </button>
                );
              })}

              {/* background grid rows */}
              {Array.from({ length: 25 }).map((_, i) => {
                if(dayAvail.active === 1) {
                  return (
                    <div
                      key={i}
                      className={`${styles.row} ${
                        i <=
                          parse(dayAvail.start_time, "H:mm", currDate).getHours() ||
                        i - 1 >=
                          parse(dayAvail.end_time, "H:mm", currDate).getHours()
                          ? styles.grey
                          : ""
                      }`}
                    />
                  )
                } else {
                  return (
                    <div
                      key={i}
                      className={styles.row} 
                    />
                  )
                }
            })}
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default DayViewCalendar;
