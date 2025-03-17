'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Accordian.module.css';
import { AccordianProps } from '../types/types';

const Accordion = ({ title, content, id, step } : AccordianProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(step === 1 && id === 0) {
      setIsActive(true)
    }
    if(step === 2 && id === 1) {
      setIsActive(true)
    }
    if(step === 3 && id === 2) {
      setIsActive(true)
    }
  }, [step, id])


  return (
    <div className={styles.accordion}>
      <div className={styles['accordion-title']} onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && 
        <div 
          className={styles['accordion-content']}
        >{content}</div>
      }
    </div>
  );
};

export default Accordion;