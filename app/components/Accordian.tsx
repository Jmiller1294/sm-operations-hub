"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Accordian.module.css";
import { AccordianProps } from "../types/types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Accordion = ({
  title,
  id,
  step,
  children,
  icon,
  style,
}: AccordianProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (step === 1 && id === 0) {
      setIsActive(true);
    }
    if (step === 2 && id === 1) {
      setIsActive(true);
    }
    if (step === 3 && id === 2) {
      setIsActive(true);
    }
  }, [step, id]);

  return (
    <div className={styles.accordion} style={style}>
      <div
        className={styles["accordion-title"]}
        onClick={() => setIsActive(!isActive)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>{icon ? icon : null}</span>{" "}
          {title}
        </div>
        <div style={{ marginLeft: "auto", marginTop: "auto" }}>
          {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isActive && (
        <div className={styles["accordion-content"]}>{children}</div>
      )}
    </div>
  );
};

export default Accordion;
