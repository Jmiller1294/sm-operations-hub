"use client";
import {
  useEffect,
  useState,
  useRef,
  useContext,
  useMemo,
  useCallback,
  FC,
  useLayoutEffect,
} from "react";
import styles from "../../../styles/Calendar.module.css";
import {
  addDays,
  eachDayOfInterval,
  format,
  getHours,
  getMinutes,
  parse,
  startOfWeek,
} from "date-fns";
import { Appointment, Availability } from "@/app/types/types";
import { useSearchParams } from "next/navigation";
import AppointmentsContext from "@/app/store/appointments-context";
import { useModal } from "@/app/store/modal-context";
import AppointmentInfo from "../../components/AppointmentInfo";



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


const WeekViewCalendar:FC = () => {
  const date = useMemo(() => new Date(), []);
  const { appointments, availability, employees } =
    useContext(AppointmentsContext);
  const searchParams = useSearchParams();
  const currDateISO = searchParams.get("date") ?? new Date().toISOString();
  const currDate = new Date(currDateISO);
  const fullDayName = format(currDate, "EEEE");
  const dayAvail: Availability | undefined = availability.find(
    (d) => d.day === fullDayName
  );
  const { openModal, closeModal } = useModal();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    console.log(availability);
  }, [availability]);

  const currentHourRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    requestAnimationFrame(() =>
      currentHourRef.current?.scrollIntoView({ block: "center" })
    );
  }, []);

  const timeSlots = useMemo(makeTimeSlots, []);

  const getDaysOfWeek = useCallback(() => {
    let currDate: Date | string = date;
    if (searchParams.get("date")) {
      currDate = searchParams.get("date") as string;
    }
    const weekStart = startOfWeek(currDate, { weekStartsOn: 1 });
    const weekDates = eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    });
    return [...weekDates];
  }, [date, searchParams]);

  const filteredAppointments = useMemo(() => {
    return getDaysOfWeek()?.reduce((acc: any, day: Date) => {
      acc[format(day, "MMMM dd, yyyy")] = appointments?.filter(
        (app: Appointment) => app.date === format(day, "MMMM dd, yyyy")
      );
      return acc;
    }, {} as Record<string, Appointment[]>);
  }, [getDaysOfWeek, appointments]);

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
        {getDaysOfWeek().map((day) => {
          const empApps = filteredAppointments?.[format(day, "MMMM dd, yyyy")] || [];
          const fullDayName = format(day, "EEEE");
          const dayAvail = availability.find(
            (d) => d.day === fullDayName
          );
          if (!dayAvail) return null;
          const startHr = parse(dayAvail.start_time, "H:mm", currDate).getHours();
          const endHr = parse(dayAvail.end_time, "H:mm", currDate).getHours();
          if (!dayAvail.active || startHr >= endHr) return null;
          return (
            <div key={day.getTime()} className={styles.col}>
              {/* appointments */}
              {empApps.map((app: Appointment) => {
                const top = startPixel(app.datetime);
                const height = slotHeight(app.duration);
                const appStartHr = getHours(app.datetime);

                // skip if outside working window
                if (
                  appStartHr <
                    parse(dayAvail.start_time, "H:mm", currDate).getHours() ||
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
                        <AppointmentInfo data={app} onClose={closeModal} />
                      )
                    }
                  >
                    <span className={styles.appointmentName}>
                      {app.first_name} {app.last_name}:&nbsp;
                    </span>
                    <span className={styles.appointmentType}>{app.type}</span>
                    <div>
                      {app.start_time} – {app.end_time}
                    </div>
                  </button>
                );
              })}

              {/* background grid rows */}
              {Array.from({ length: 25 }).map((_, i) => {
                if (dayAvail.active === 1) {
                  return (
                    <div
                      key={i}
                      className={`${styles.row} ${
                        i <=
                          parse(
                            dayAvail.start_time,
                            "H:mm",
                            currDate
                          ).getHours() ||
                        i - 1 >=
                          parse(dayAvail.end_time, "H:mm", currDate).getHours()
                          ? styles.grey
                          : ""
                      }`}
                    />
                  );
                } else {
                  return <div key={i} className={styles.row} />;
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default WeekViewCalendar;