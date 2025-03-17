/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FaList, FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { 
  addDays, 
  addMonths, 
  addWeeks,  
  startOfWeek, 
  subDays, 
  subMonths, 
  subWeeks, 
  format
} from 'date-fns';
import styles from '../../styles/AppointmentsPage.module.css';
import { Context } from '@/app/context/appContext';
import NewAppointmentForm from '@/app/components/forms/NewAppointmentForm';
import { BiNews } from 'react-icons/bi';


const Header = () => {
  const { state, openModal, closeModal } = useContext(Context);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = format(Date.now(), 'MMM dd, yyyy');
  const [position, setPosition] = useState('left'); 
  const [mounted, setMounted] = useState(false);
 

  useEffect(() => {
    setMounted(true);
    checkPosition();
  }, []);

  const checkPosition = () => {
    if(pathname.includes('day')) {
      setPosition('left');
    }
    if(pathname.includes('week')) {
      setPosition('center');
    }
    if(pathname.includes('month')) {
      setPosition('right');
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString();
    },
    [searchParams]
  )

  const changeDate = (direction: 'increase' | 'decrease') => {
    let updatedDate: string = '';
    let currDate = date;
    if(searchParams.get('date')) {
      currDate = searchParams.get('date') as string;
    } 

    if(pathname.includes('week') || (pathname.includes('list'))) {
      const nextWeekStart:Date = direction === 'increase' 
        ? startOfWeek(addWeeks(currDate, 1), { weekStartsOn: 1 })
        : startOfWeek(subWeeks(currDate, 1), { weekStartsOn: 1 })
      updatedDate = format(nextWeekStart, 'MMM d, yyyy');
    }
    else if(pathname.includes('month')) {
      updatedDate = direction === 'increase' 
        ? format(addMonths(currDate, 1), 'MMMM, yyyy')
        : format(subMonths(currDate, 1), 'MMMM, yyyy')
    }
    else {
      updatedDate = direction === 'increase' 
        ? format(addDays(currDate, 1), 'MMM dd, yyyy')
        : format(subDays(currDate, 1), 'MMM dd, yyyy');
    }
    router.push(pathname + '?' + createQueryString('date', updatedDate));
  };

  const getDate = () => {
    let currDate = date;
    if(searchParams.get('date')) {
      currDate = searchParams.get('date') as string;
    }

    if(pathname.includes('week') || (pathname.includes('list'))) {
      const startOfWeekDate = startOfWeek(currDate, { weekStartsOn: 1 });
      const formattedDate = format(startOfWeekDate, 'MMM d, yyyy');
      return formattedDate;
    }
    else if(pathname.includes('month')) {
      const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
      const formattedDate = format(startOfWeekDate, 'MMMM, yyyy');
      return formattedDate;
    }
    else {
      return date;
    }
  }

  const handleModalOpen = () => {
    openModal(<NewAppointmentForm onClose={handleModalClose}/>);
  };

  const handleModalClose = () => {
    closeModal();
  }

  const handlePositionChange = useCallback((position: string, type: string) => {
    setPosition(position);
    router.push(`/appointments/calendar/${type}`);
  }, [router]);

  const handleToggle = () => {
    console.log(pathname)
    if(pathname.includes('calendar')) {
      router.push('/appointments/list');
      setPosition('left');
    }
    if(pathname.includes('list')) {
      router.push('/appointments/calendar');
    }
  };

  const handleToday = () => {
    if(pathname.includes('week')) {
      router.push('/appointments/calendar/week');
    }
    else if(pathname.includes('month')) {
      router.push('/appointments/calendar/month');
    }
    else {
      router.push('/appointments/calendar/day');
    }
  }

  
  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <div className={styles.toggleContainer}>
          <input 
            type="checkbox" 
            id="toggle" 
            className={styles.toggleInput} 
            checked={pathname.includes('list') ? true : false} 
            onChange={() => handleToggle()} 
          />
          <label htmlFor="toggle" className={styles.toggleLabel}>
            <span><FaRegCalendarAlt size={16}/></span>
            <span><FaList size={14}/></span>
          </label>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.IconContainer}>
          <span className={styles.calendarArrows} onClick={() => changeDate('decrease')}><IoIosArrowBack size={24} /></span>
          <span className={styles.calendarArrows} onClick={() => changeDate('increase')}><IoIosArrowForward size={24} /></span>
        </div>
        <span className={styles.dateText}>
          {pathname.includes('week') ||  pathname.includes('list') ? 'Week of ' : null}
          {searchParams.get('date') ? searchParams.get('date') : getDate()}
          <span className={styles.todayText}>
            {(pathname === '/appointments/calendar' || pathname.includes('day')) 
              && (!searchParams.get('date') || searchParams.get('date') === date) 
              ? 'Today' : null
            }
          </span>
        </span>
        <div className={styles.buttonsContainer}>
          <button className={styles.todayButton} onClick={() => handleToday()}>Today</button>
          <div className={styles.toggleCon}>
            <input
              type="radio"
              id="left"
              name="toggle"
              className={styles.toggleIn}
              checked={position === "left"}
              disabled={pathname.includes('list')}
              onChange={
                () => handlePositionChange(
                  'left', 
                  'day',
              )}
            />
            <label 
              htmlFor="left" 
              className={styles.toggleLab}
              data-position={position}
            >
              <span 
                style={position === "left" ? 
                {color: '#ffffff'} : 
                {color: '#000000'}}
              >
                Day
              </span>
            </label>
            <input
              type="radio"
              id="center"
              name="toggle"
              className={styles.toggleIn}
              checked={position === "center"}
              disabled={pathname.includes('list')}
              onChange={
                () => handlePositionChange(
                  'center', 
                  'week',
              )}
            />
            <label 
              htmlFor="center" 
              className={styles.toggleLab}
            ><span style={position === "center" ? {color: '#ffffff'} : {color: '#000000'}}>Week</span></label>
            <input
              type="radio"
              id="right"
              name="toggle"
              className={styles.toggleIn}
              checked={position === "right"}
              disabled={pathname.includes('list')}
              onChange={
                () => handlePositionChange(
                  'right', 
                  'month',
              )}
            />
            <label htmlFor="right" className={styles.toggleLab}><span style={position === "right" ? {color: '#ffffff'} : {color: '#000000'}}>Month</span></label>
            <div className={`${styles.toggleSlider} ${pathname.includes('list') ? styles.disabled : styles.active}`} data-position={position}></div>
          </div>
          <button 
            className={styles.appointmentButton} 
            onClick={() => handleModalOpen()}
          >
            New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header