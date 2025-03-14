'use client'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from '../../../styles/Calendar.module.css';
import { format, getDaysInMonth } from 'date-fns';
import { Appointment } from '@/app/types/types';
import { Context } from '@/app/context/appointmentsContext';
import { startOfMonth } from 'date-fns/fp';
import { useSearchParams } from 'next/navigation';



const MonthPage = () => {
  const tableColumns = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);
  const date = useMemo(() => new Date(), []);
  const totalDays = getDaysInMonth(date);
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const [calendarGrid, setCalendarGrid] = useState<any[][]>([]);
  const { state, getAppointments } = useContext(Context);
  const searchParams = useSearchParams();
  

  useEffect(() => {
    getAppointments();
    createCalendarGrid();
  }, [searchParams]);

  const createCalendarGrid = useCallback(() => {
    const month = searchParams.get('date') ? new Date(searchParams.get('date') as string) : date;
    const startDay = startOfMonth(month).getDay() - 1;
    const grid: (number | null)[][] = [];
    let week: (number | null)[] = startDay < 0 ? [] : Array(startDay).fill(null);
    
    daysArray.forEach((day) => {
      week.push(day);
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }
    });

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      grid.push(week);
    }
    setCalendarGrid(grid);
  }, [searchParams, date, daysArray])

  const getDate = useCallback((day: number) => {
    const selectedDate = searchParams.get('date') || format(date, 'MMMM, yyyy');
    return day === date.getDate() && selectedDate === format(date, 'MMMM, yyyy') ? styles.border : null;
  }, [date, searchParams]);

  const filteredAppointments = useMemo(() => {
    return state.appointments.filter((app: Appointment) => {
      return format(app.date, 'MMMM, yyyy') === searchParams.get('date');
    });
  }, [state.appointments, searchParams]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr style={{textAlign: 'left'}}>
            {tableColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {calendarGrid.map((week:number[], index:number) => (
            <tr key={index} style={{ width: '100%'}}>
              {week.map((day:number, idx:number) => {
                return (
                <td key={idx} className={`${styles.tableCell} ${getDate(day)}`}>
                  <div className={styles.con}>
                    <div className={styles.dayText}>{day ? day : ""}</div>
                    {filteredAppointments.map((app:Appointment, idx:number) => {
                      if(format(app.date, 'MMMM, yyyy') === searchParams.get('date') && day === parseInt(format(app.date, 'd'))) {
                        return(
                          <div 
                            className={styles.appTypeText} 
                            key={idx} 
                            onClick={() => console.log('clicked')}
                          >
                            <div className={styles.circle}></div>
                            {app.startTime} 
                            {app.type}
                          </div>
                        )
                      }
                    })}
                  </div>
                </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthPage