"use client";
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import styles from "../../../styles/Calendar.module.css";
import { format, getHours, getMinutes, parse } from "date-fns";
import { Appointment, Employee } from "@/app/types/types";
import { Context as AppointmentContext } from "@/app/context/appointmentsContext";
import { Context as AppContext } from "@/app/context/appContext";
import { useSearchParams } from "next/navigation";
import AppointmentInfo from "../../components/AppointmentInfo";

const DayViewCalendar = () => {
  const date = useMemo(() => new Date(), []);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotHeight, setDotHeight] = useState(0);
  const numbers = Array.from(Array(25).keys());
  const elementRef = useRef<HTMLDivElement>(null);
  const { state, getEmployees, getAppointments } =
    useContext(AppointmentContext);
  const { openModal, closeModal } = useContext(AppContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    getEmployees();
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

  const handleModalOpen = (id: number) => {
    openModal(
      <AppointmentInfo
        data={state.appointments[id - 1]}
        onClose={handleModalClose}
      />
    );
  };

  const handleModalClose = () => {
    closeModal();
  };

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

  const filteredAppointments = useMemo(() => {
    return state.employees?.reduce((acc: any, employee: Employee) => {
      acc[employee.name] = state.appointments?.filter(
        (app: Appointment) =>
          app.calendar === employee.name &&
          app.date ===
            format(
              searchParams.get("date")
                ? new Date(searchParams.get("date")!)
                : date,
              "MMMM dd, yyyy"
            )
      );
      return acc;
    }, {} as Record<string, Appointment[]>);
  }, [state.employees, state.appointments, searchParams, date]);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.timeDot} style={{ top: dotHeight }}></div>
      <div className={styles.timeLine} style={{ top: lineHeight }}></div>
      <div className={styles.timeColumn}>
        {timeSlots.map((time: string, index: number) => {
          if (index === parseInt(format(date, "H"))) {
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
      {state.employees?.map((employee: Employee, idx: number) => {
        const employeeAppointments =
          filteredAppointments?.[employee.name] || [];

        return (
          <div className={styles.col} key={idx}>
            {employeeAppointments.map((appointment: Appointment) => (
              <div
                key={appointment.id}
                className={styles.appointment}
                style={{
                  top: `${getStartPosition(appointment.startTime)}px`,
                  height: getTimeSlotHeight(appointment),
                }}
                onClick={() => handleModalOpen(appointment.id)}
              >
                <div className={styles.appointmentInfoCon}>
                  <span className={styles.appointmentName}>
                    {appointment.firstName} {appointment.lastName}: &nbsp;
                  </span>
                  <span className={styles.appointmentType}>
                    {appointment.type}
                  </span>
                </div>
                <div>
                  {appointment.startTime} - {appointment.endTime}
                </div>
              </div>
            ))}
            {numbers.map((index) => (
              <div key={index} className={styles.row}></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default DayViewCalendar;
