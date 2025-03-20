import React, { useState } from "react";
import styles from "../../styles/Forms.module.css";
import { EditAppointmentFormProps } from "@/app/types/types";

const EditAppointmentForm = ({
  data,
  onClose,
  onClick,
}: EditAppointmentFormProps) => {
  const [values, setValues] = useState({
    calendar: "hello",
    appointment: "",
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    notes: data.notes,
  });

  const handleChanges = (e: any) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  const handleOnSave = () => {
    onClick("Save");
  };

  return (
    <div className={styles.editInfoCon}>
      <div className={styles.buttonCon}>
        <button onClick={onClose} className={styles["close-button"]}>
          Close
        </button>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.black}`}
            onClick={() => handleOnSave()}
          >
            Save
          </button>
          <button className={styles.button} onClick={() => onClick("Cancel")}>
            Cancel Edit
          </button>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.textContainer}>
          <p>Date</p>
          <span>{data.date}</span>
        </div>
        <div className={styles.textContainer}>
          <p>Time</p>
          <span>
            {data.startTime} - {data.endTime}
          </span>
        </div>
        <div className={styles.textContainer}>
          <label>Calendar</label>
          <select
            name="cars"
            id="cars"
            className={styles["input-text"]}
            value={values.calendar}
            onChange={(e) => handleChanges(e)}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className={styles.textContainer}>
          <label>Appointment Type</label>
          <select
            name="cars"
            id="cars"
            className={styles["input-text"]}
            value={values.appointment}
            onChange={(e) => handleChanges(e)}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className={styles.textContainer}>
          <label>First Name</label>
          <input
            type="text"
            className={styles["input-text"]}
            value={values.firstName}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Last Name</label>
          <input
            type="text"
            className={styles["input-text"]}
            value={values.lastName}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Email</label>
          <input
            type="text"
            className={styles["input-text"]}
            value={values.email}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Phone</label>
          <input
            type="text"
            className={styles["input-text"]}
            value={values.phone}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Client Address</label>
          <input
            type="text"
            className={styles["input-text"]}
            value={values.address}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <h4>Notes</h4>
          <textarea
            className={styles["input-textarea"]}
            value={values.notes}
            onChange={(e) => handleChanges(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAppointmentForm;
