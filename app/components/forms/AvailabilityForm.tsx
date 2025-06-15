"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "../../styles/Forms.module.css";
import { Day } from "@/app/types/types";
import { format, parse } from "date-fns";
import { saveAvailability } from "@/app/actions/saveAvailability";
import { useRouter } from 'next/navigation';

const AvailabilityForm = ({ onClose, availability, refreshAvailability }) => {
  const times = useMemo(
    () => [
      "1:00 AM",
      "1:30 AM",
      "2:00 AM",
      "2:30 AM",
      "3:00 AM",
      "3:30 AM",
      "4:00 AM",
      "4:30 AM",
      "5:00 AM",
      "5:30 AM",
      "6:00 AM",
      "6:30 AM",
      "7:00 AM",
      "7:30 AM",
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
      "9:30 PM",
      "10:00 PM",
      "10:30 PM",
      "11:00 PM",
      "11:30 PM",
      "12:00 AM",
      "12:30 AM",
    ],
    []
  );
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [hours, setHours] = useState(
    availability.map((d:Day) => ({
      day: d.day,
      active: d.active,
      start_time: d.start_time ? format(parse(d.start_time, 'H:mm', new Date()), 'h:mm a') : "",
      end_time: d.end_time ? format(parse(d.end_time, 'H:mm', new Date()), 'h:mm a') : "",
    }))
  );


  const handleOnSave = async () => {
    const updatedHours = hours.map((day:Day) => ({
      ...day,
      start_time: day.start_time ? format(parse(day.start_time, 'hh:mm a', new Date()), 'HH:mm') : "",
      end_time: day.end_time ? format(parse(day.end_time, 'hh:mm a', new Date()), 'HH:mm') : "",
    }));
    await saveAvailability(updatedHours);
    refreshAvailability();
    router.refresh();
    onClose();
  };

  const handleOnClose = () => {
    onClose();
  };

  const handleTimeChange = (index:number, field:any, value: any) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
    
  };

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].active = newHours[index].active === 1 ? 0 : 1;
    setHours(newHours);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.buttonCon}>
        <button onClick={onClose} className={styles["close-button"]}>
          Close
        </button>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.black}`}
            onClick={() => handleOnSave()}
          >
            Save Availability
          </button>
          <button
            className={`${styles.button}`}
            onClick={() => handleOnClose()}
          >
            Cancel
          </button>
        </div>
      </div>
      <form className={styles.form}>
        <p className={styles["working-hours-header"]}>Working Hours</p>
        <div className={styles["header"]}>
          <div>
            <span className={styles["enable-button"]}>Enable</span>
            <p>Enable or disable working hours</p>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        {enabled &&
          hours.map((day:Day, index:number) => {
            return (
              <div key={day.day} className={styles["business-day"]}>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={day.active === 1 ? true : false} 
                    onChange={() => toggleDay(index)}
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
                <span className="day-label">{day.day}</span>
                {day.active ? (
                  <div className={styles["time-inputs"]}>
                    <select className={styles.select} onChange={(e) => handleTimeChange(index, "start_time", e.target.value)}
                      value={day.start_time}>
                      {times.map((time) => (
                        <option 
                          key={time} 
                          value={time}
                        >{time}</option>
                      ))}
                    </select>
                    <span style={{ marginTop: "4px" }}>to</span>
                    <select className={styles.select} 
                      onChange={(e) => handleTimeChange(index, "end_time", e.target.value)}
                      value={day.end_time}
                    >
                      {times.map((time) => (
                        <option 
                          key={time} 
                          value={time}
                        >{time}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <span className={styles["closed-label"]}>Closed</span>
                )}
              </div>
            );
          })}
      </form>
    </div>
  );
};

export default AvailabilityForm;
