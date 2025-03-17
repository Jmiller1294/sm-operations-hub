import React from 'react';
import CalendarHeader from './components/CalendarHeader';
import { LayoutProps } from '@/.next/types/app/layout';
import styles from '../../styles/Calendar.module.css';


const CalendarLayout = ({ children } : LayoutProps) => {
  return (
    <>
      <CalendarHeader />
      <main className={styles.mainContainer}>
        {children}
      </main>
    </>
  )
}

export default CalendarLayout