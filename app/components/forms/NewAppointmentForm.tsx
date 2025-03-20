"use client";
import React, { useMemo, useState } from "react";
import styles from "../../styles/Forms.module.css";
import Accordion from "../Accordian";
import DatetimePicker from "../DatetimePicker";
import ClientDetailsForm from "./ClientDetailsForm";
import ClientInfoForm from "./ClientInfoForm";
import { NewAppointmentFormProps } from "@/app/types/types";

const NewAppointmentForm = ({ onClose }: NewAppointmentFormProps) => {
  const [step, setStep] = useState(1);
  const handleOnClick = () => {
    setStep(3);
  };

  const handleOnClose = () => {
    onClose();
  };

  const accordionData = useMemo(
    () => [
      {
        title: "Appointment Type",
        content: (
          <div className={styles.selectCon}>
            <select
              className={styles["input-select"]}
              onChange={() => setStep(2)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        ),
      },
      {
        title: "Date & Time",
        content: <DatetimePicker onClick={handleOnClick} />,
      },
      { title: "Client Info", content: <ClientInfoForm /> },
      { title: "Appointment Details", content: <ClientDetailsForm /> },
    ],
    []
  );

  return (
    <div>
      <div className={styles["header-container"]}>
        <button
          className={styles["close-button"]}
          onClick={() => handleOnClose()}
        >
          Close
        </button>
      </div>
      <div>
        {accordionData.map(({ title, content }, index: number) => (
          <Accordion
            key={index}
            title={title}
            content={content}
            id={index}
            step={step}
          />
        ))}
      </div>
    </div>
  );
};

export default NewAppointmentForm;
