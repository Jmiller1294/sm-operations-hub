import React, { useState } from "react";
import { format } from "date-fns";
import styles from "../styles/DatetimePicker.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { DatetimePickerProps } from "../types/types";

const timeSlots = [
  {
    time: "2025-02-25T13:00:00-0800",
  },
  {
    time: "2025-02-25T14:00:00-0800",
  },
  {
    time: "2025-02-25T15:00:00-0800",
  },
  {
    time: "2025-02-25T16:00:00-0800",
  },
  {
    time: "2025-02-25T17:00:00-0800",
  },
  {
    time: "2025-02-25T18:00:00-0800",
  },
];

const DatetimePicker = ({ onClick }: DatetimePickerProps) => {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <div className={styles.calendarContainer}>
      <DayPicker
        required
        animate
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
      <div className={styles.calendarDetails}>
        <h4>{format(selected, "EEEE, MMMM dd")}</h4>
        <div className={styles.timeSlotsCon}>
          {timeSlots.map((timeslot, index: number) => {
            return (
              <button key={index} className={styles.timeSlot} onClick={onClick}>
                {format(timeslot.time, "p")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatetimePicker;
