"use client";
import {
  useEffect,
  useState,
  useRef,
  useContext,
  useMemo,
  useCallback,
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
import { Appointment } from "@/app/types/types";
import { useSearchParams } from "next/navigation";
import AppointmentsContext from "@/app/store/appointments-context";

const WeekPage = () => {
  const date = useMemo(() => new Date(), []);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotHeight, setDotHeight] = useState(0);
  const numbers = Array.from(Array(25).keys());
  const elementRef = useRef<any>();
  const searchParams = useSearchParams();
   const { appointments, availability, employees } =
     useContext(AppointmentsContext);

  useEffect(() => {
    scrollToTime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotHeight((prev) => prev + 1);
      setLineHeight((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const timeSlots = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => {
      const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "pm" : "am";
      return `${formattedHour}:00 ${period}`;
    });
  }, []);

  const scrollToTime = () => {
    const currentTime = date;
    const minutesSinceMidnight =
      getHours(currentTime) * 60 + 60 + getMinutes(currentTime);
    setDotHeight(minutesSinceMidnight - 5);
    setLineHeight(minutesSinceMidnight);
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const getStartPosition = (time: string) => {
    const parsedTime = parse(time, "hh:mm a", date);
    return getHours(parsedTime) * 60 + 60 + getMinutes(parsedTime);
  };

  const getTimeSlotHeight = (appointment: Appointment) => {
    const { duration, start_date_time, end_date_time} = appointment;
    if (getHours(end_date_time) < getHours(start_date_time)) {
      return (
        duration - (getHours(end_date_time) * 60 + getMinutes(end_date_time)) - 5
      );
    }
    return duration - 5;
  };

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
      <div
        className={styles.timeLine}
        style={{
          top: `${lineHeight}px`,
        }}
      ></div>
      <div
        className={styles.timeDot}
        style={{
          top: `${dotHeight}px`,
        }}
      ></div>
      <div className={styles.timeColumn}>
        {timeSlots.map((time: string, index: number) => {
          if (index === parseInt(format(new Date(), "H"))) {
            return (
              <div ref={elementRef} key={index} className={styles.timeSlot}>
                {time}
              </div>
            );
          } else {
            return (
              <div key={index} className={styles.timeSlot}>
                {time}
              </div>
            );
          }
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "row", flex: 10 }}>
        {getDaysOfWeek().map((day: Date, index: number) => {
          const appointments =
            filteredAppointments?.[format(day, "MMMM dd, yyyy")] || [];
          return (
            <div className={styles["small-col"]} key={index}>
              {appointments?.map((appointment: Appointment, idx: number) => {
                return (
                  <div
                    key={idx}
                    className={styles.appointment}
                    style={{
                      top: `${getStartPosition(appointment.start_time)}px`,
                      height: getTimeSlotHeight(appointment),
                    }}
                    onClick={() => console.log("clicked")}
                  >
                    <div className={styles.appointmentInfoCon}>
                      {appointment.first_name} {appointment.last_name}
                    </div>
                    <div>
                      {appointment.start_time} - {appointment.end_time}
                    </div>
                  </div>
                );
              })}
              {numbers.map((index) => (
                <div key={index} className={styles.row}></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekPage;
