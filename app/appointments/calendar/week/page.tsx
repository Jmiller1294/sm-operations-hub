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
import { Context } from "@/app/context/appointmentsContext";
import { useSearchParams } from "next/navigation";

const WeekPage = () => {
  const date = useMemo(() => new Date(), []);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotHeight, setDotHeight] = useState(0);
  const numbers = Array.from(Array(25).keys());
  const elementRef = useRef<any>();
  const { state, getAppointments } = useContext(Context);
  const searchParams = useSearchParams();

  useEffect(() => {
    getAppointments();
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
    const { duration, startDateTime, endDateTime } = appointment;
    if (getHours(endDateTime) < getHours(startDateTime)) {
      return (
        duration - (getHours(endDateTime) * 60 + getMinutes(endDateTime)) - 5
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
      console.log("acc:", acc, "day:", day);
      acc[format(day, "MMMM dd, yyyy")] = state.appointments?.filter(
        (app: Appointment) => app.date === format(day, "MMMM dd, yyyy")
      );
      return acc;
    }, {} as Record<string, Appointment[]>);
  }, [getDaysOfWeek, state.appointments]);

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
                    top: `${getStartPosition(appointment.startTime)}px`,
                    height: getTimeSlotHeight(appointment),
                  }}
                  onClick={() => console.log("clicked")}
                >
                  <div className={styles.appointmentInfoCon}>
                    {appointment.firstName} {appointment.lastName}
                  </div>
                  <div>
                    {appointment.startTime} - {appointment.endTime}
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
  );
};

export default WeekPage;
