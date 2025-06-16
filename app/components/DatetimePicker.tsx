import React, { useState } from "react";
import { format } from "date-fns";
import styles from "../styles/DatetimePicker.module.css";
import "react-day-picker/style.css";
import { DatetimePickerProps } from "../types/types";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

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
  const defaultClassNames = getDefaultClassNames();

  return (
    <div className={styles.calendarContainer}>
      <DayPicker
        required
        animate
        mode="single"
        classNames={{
          today: `border-amber-500`, // Add a border to today's date
          selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
          day: `text-gray-700`, // Change the text color of the days
          months: `w-full h-full`,
          month_grid: `w-full h-full`, // Change the text color of the months
          root: ` flex bg-red-500 w-1/2 h-64 text-base items-center justify-center`, // Add a shadow to the root element
          chevron: `${defaultClassNames.chevron} fill-amber-500`, // Change the color of the chevron
        }}
        selected={selected}
        onSelect={setSelected}
      />
      <div className={styles.calendarDetails}>
        <h4>{format(selected, "EEEE, MMMM dd")}</h4>
        <div className={styles.timeSlotsCon}>
          {timeSlots.map((timeslot, index: number) => {
            return (
              <button key={index} className={styles.timeSlot} onClick={onClick}>
                {format(new Date(timeslot.time), "p")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatetimePicker;
