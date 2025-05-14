"use client";
import React, { useMemo, useState } from "react";
import styles from "../../styles/Forms.module.css";

const AvailabilityForm = ({ onClose, onClick }) => {
  const days = useMemo(
    () => [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    []
  );

  const times = useMemo(
    () => [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
      "9:00 PM",
      "10:00 PM",
      "11:00 PM",
      "12:00 AM",
      "1:00 AM",
      "2:00 AM",
      "3:00 AM",
      "4:00 AM",
      "5:00 AM",
      "6:00 AM",
      "7:00 AM",
      "8:00 AM",
    ],
    []
  );

  const [enabled, setEnabled] = useState(true);
  const [hours, setHours] = useState(
    days.map((day) => ({
      day,
      active: days.includes(day),
      from: "09:00 AM",
      to: "5:30 PM",
    }))
  );

  const handleOnSave = () => {
    console.log(hours);
    //onClick("Save");
  };

  const handleOnClose = () => {
    //onClose("Save");
  };

  const handleTimeChange = (index, field, value) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
  };

  const toggleDay = (index) => {
    const newHours = [...hours];
    newHours[index].active = !newHours[index].active;
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
          hours.map((item, index) => {
            return (
              <div key={item.day} className={styles["business-day"]}>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={() => toggleDay(index)}
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
                <span className="day-label">{item.day}</span>
                {item.active ? (
                  <div className={styles["time-inputs"]}>
                    <select className={styles.select}>
                      {}
                      <option value="angular">{item.from}</option>
                    </select>
                    <span style={{ marginTop: "4px" }}>to</span>
                    <select className={styles.select}>
                      <option value="angular">{item.to}</option>
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
