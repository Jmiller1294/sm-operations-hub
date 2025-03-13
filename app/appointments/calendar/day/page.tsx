'use client'
import { useEffect, useState, useRef, useContext } from "react";
import styles from '../../../styles/Calendar.module.css';
import { 
  format, 
  getHours, 
  getMinutes, 
  hoursToMinutes 
} from 'date-fns';
import { Employee } from "@/app/types/types";
import { Context } from "@/app/context/appointmentsContext";


const DayViewCalendar = () => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotHeight, setDotHeight] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const numbers = Array.from(Array(25).keys()); 
  const elementRef = useRef<any>();
  const { state, getEmployees } = useContext(Context);
  


  // useEffect(() => {
  //   createTimeSlots();
  //   scrollToTime();
  // },[]);

  // useEffect(() => {
  //   //Implementing the setInterval method
  //   const interval = setInterval(() => {
  //     setDotHeight(dotHeight + 1);
  //     setLineHeight(lineHeight + 1);
  //   }, 60000);

    //Clearing the interval
//     return () => clearInterval(interval);
// }, [dotHeight, lineHeight]);

  const createTimeSlots = () => {
    const times = [];
    for (let hour = 1; hour <= 24; hour++) {
      if(hour < 12) {
        times.push(`${hour}:00 am`);
      }
      else if(hour === 12) {
       times.push(`${hour}:00 pm`);
      }
      else if(hour === 24) {
        times.push(`${hour - 12}:00 am`);
      }
      else {
        times.push(`${hour - 12}:00 pm`);
      }
    }
    setTimeSlots(times);
  }

  const scrollToTime = () => {
    // //const minutes = hoursToMinutes(getHours(new Date()));
    // //const halfMinutes = getMinutes(new Date());
    // setDotHeight((minutes + halfMinutes) - 5);
    // setLineHeight(minutes + halfMinutes);
    // setTimeout(() => {
    //   elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }, 500)
  }

  const getStartPosition = (time:string) => {  
    const [hour] = time.split(":").map(Number);
    const minutes = parseInt(time.split(":")[1]);

    if(time.includes('am')) {
      if(hour === 12) {
        return getStartPixels(hour + 12, minutes);
      }
      return getStartPixels(hour, minutes);
    }
    else {
      if(hour === 12) {
        return getStartPixels(hour, minutes);
      }
      else if(hour < 12) {
        return getStartPixels(hour + 12, minutes);
      }
    }
  };

  const getStartPixels = (hour:number, minutes:number) => { 
    return Math.abs((((hour - 1) * 59) + minutes) + (hour * 1) + 59);
  };

  const getTimeSlotHeight = (appointment:any) => { 
    return parseInt(appointment.duration) - 5;
  };

  const handleClick = (type:string, id:number) => {
    //toggleModal(type, id);
  };

  return (
    <div>Day</div>
  );
};

export default DayViewCalendar;