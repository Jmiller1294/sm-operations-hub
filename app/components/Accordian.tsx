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
  isExpanded
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

  const handleClick = () => {
    if(isExpanded) {
      setIsActive(!isActive);
    }
  }

  return (
    <div className={styles.mainContainer} style={style}>
      <div
        className={styles["accordion-container"]}
        onClick={() => handleClick()}
      >
        <span className={styles.icon}>{icon ? icon : null}</span>
        <span style={isExpanded ? {} : {display: 'none'}}>{title}</span>
        <div
          className={`${styles.arrow} ${
            isExpanded ? "" : styles["arrow-closed"]
          }`}
        >
          {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>

      { (
        <div className={styles['accordion-content']}
        >
          <span className={styles['menu-closed']} style={{display: 'block',marginLeft: '82px', color: 'red'}}>{title}</span>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
