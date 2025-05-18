"use client";
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import styles from "../../../styles/Calendar.module.css";
import { format, getHours, getMinutes, parse } from "date-fns";
import { Appointment, Availability, Employee } from "@/app/types/types";
import AppointmentsContext from "@/app/store/appointments-context";
import { useSearchParams } from "next/navigation";
import AppointmentInfo from "../../components/AppointmentInfo";
import { useModal } from "@/app/store/modal-context";

const DayViewCalendar = () => {
  const date = useMemo(() => new Date(), []);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotHeight, setDotHeight] = useState(0);
  const numbers = Array.from(Array(25).keys());
  const elementRef = useRef<HTMLDivElement>(null);
  const { appointments, availability, employees } =
    useContext(AppointmentsContext);
  const searchParams = useSearchParams();
  const currDate = searchParams.get("date") as string;
  const fullDayName = format(currDate, "EEEE");
  const day = availability.find((val) => val.day === fullDayName);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    scrollToTime();
    console.log(appointments)
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
      <AppointmentInfo data={appointments[id - 1]} onClose={closeModal} />
    );
  };

  const scrollToTime = () => {
    const currentTime = date;
    const minutesSinceMidnight =
      getHours(currentTime) * 60 + 240 + getMinutes(currentTime);
    setDotHeight(minutesSinceMidnight - 5);
    setLineHeight(minutesSinceMidnight);
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const getStartPosition = (time: string) => {
    const [hour, minutes] = day?.start_time?.split(":") as string[];
    return parseInt(hour as string) * 60 + 60 + parseInt(minutes);
  };

  const getTimeSlotHeight = (appointment: Appointment) => {
    const { duration, start_time, date_time } = appointment;
    console.log(getHours(start_date_time), getHours(end_date_time));
    if (getHours(end_date_time) < getHours(start_date_time)) {
      return (
        duration -
        (getHours(end_date_time) * 60 + getMinutes(end_date_time)) -
        5
      );
    }
    return (60*8) - 5;
  };

  const filteredAppointments = useMemo(() => {
    return employees?.reduce((acc: any, employee: Employee) => {
      acc[employee.name] = appointments?.filter(
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
  }, [employees, appointments, searchParams, date]);

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
      <div style={{ display: "flex", flexDirection: "row", flex: 10 }}>
        {employees?.map((employee: Employee, idx: number) => {
          const employeeAppointments =
            filteredAppointments?.[employee.name] || [];

          return (
            <div className={styles.col} key={idx}>
              {employeeAppointments.map((appointment: Appointment) => {
                console.log(
                  parseInt(appointment.end_time?.split(":")[0] as string),
                  parseInt(day?.end_time?.split(":")[0] as string)
                );
                if (
                  parseInt(appointment.start_time?.split(":")[0] as string) >=
                    parseInt(day?.start_time?.split(":")[0] as string) &&
                  parseInt(appointment.end_time?.split(":")[0] as string) <=
                    parseInt(day?.end_time?.split(":")[0] as string)
                ) {
                  return (
                    <div
                      key={appointment.id}
                      className={styles.appointment}
                      style={{
                        top: `${getStartPosition(appointment.start_time)}px`,
                        height: getTimeSlotHeight(appointment),
                      }}
                      onClick={() => handleModalOpen(appointment.id)}
                    >
                      <div className={styles.appointmentInfoCon}>
                        <span className={styles.appointmentName}>
                          {appointment.first_name} {appointment.last_name}:
                          &nbsp;
                        </span>
                        <span className={styles.appointmentType}>
                          {appointment.type}
                        </span>
                      </div>
                      <div>
                        {appointment.start_time} - {appointment.end_time}
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
              {numbers.map((index) => (
                <div
                  key={index}
                  className={`${styles.row} ${
                    index <=
                      parseInt(day?.start_time?.split(":")[0] as string) ||
                    index - 1 >=
                      parseInt(day?.end_time?.split(":")[0] as string)
                      ? styles.grey
                      : null
                  }`}
                ></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayViewCalendar;
