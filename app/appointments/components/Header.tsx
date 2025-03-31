/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FaList, FaRegCalendarAlt } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import {
  addDays,
  addMonths,
  addWeeks,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  format,
} from "date-fns";
import styles from "../../styles/AppointmentsPage.module.css";
import { Context } from "@/app/context/appContext";
import NewAppointmentForm from "@/app/components/forms/NewAppointmentForm";
import Link from "next/link";
import CalendarHeader from "../calendar/components/CalendarHeader";

const Header = () => {
  const { state, openModal, closeModal } = useContext(Context);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = format(Date.now(), "MMM dd, yyyy");
  const [mounted, setMounted] = useState(false);
  const [CalendarTypeIsClicked, setCalendarTypeIsClicked] = useState(false);
  const [settingsIsClicked, setSettingsIsClicked] = useState(false);
  const calendarTypeRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const changeDate = (direction: "increase" | "decrease") => {
    let updatedDate: string = "";
    let currDate = date;
    if (searchParams.get("date")) {
      currDate = searchParams.get("date") as string;
    }

    if (pathname.includes("week") || pathname.includes("list")) {
      const nextWeekStart: Date =
        direction === "increase"
          ? startOfWeek(addWeeks(currDate, 1), { weekStartsOn: 1 })
          : startOfWeek(subWeeks(currDate, 1), { weekStartsOn: 1 });
      updatedDate = format(nextWeekStart, "MMM d, yyyy");
    } else if (pathname.includes("month")) {
      updatedDate =
        direction === "increase"
          ? format(addMonths(currDate, 1), "MMMM, yyyy")
          : format(subMonths(currDate, 1), "MMMM, yyyy");
    } else {
      updatedDate =
        direction === "increase"
          ? format(addDays(currDate, 1), "MMM dd, yyyy")
          : format(subDays(currDate, 1), "MMM dd, yyyy");
    }
    router.push(pathname + "?" + createQueryString("date", updatedDate));
  };

  const getDate = () => {
    let currDate = date;
    if (searchParams.get("date")) {
      currDate = searchParams.get("date") as string;
    }

    if (pathname.includes("week") || pathname.includes("list")) {
      const startOfWeekDate = startOfWeek(currDate, { weekStartsOn: 1 });
      const formattedDate = format(startOfWeekDate, "MMM d, yyyy");
      return formattedDate;
    } else if (pathname.includes("month")) {
      const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
      const formattedDate = format(startOfWeekDate, "MMMM, yyyy");
      return formattedDate;
    } else {
      return date;
    }
  };

  const getCalendarType = () => {
    if (pathname.includes("week")) {
      return "Week";
    }
    if (pathname.includes("month")) {
      return "Month";
    }
    return "Day";
  };

  const handleModalOpen = () => {
    openModal(<NewAppointmentForm onClose={handleModalClose} />);
  };

  const handleModalClose = () => {
    closeModal();
  };

  const handleCalendarTypeClick = () => {
    setCalendarTypeIsClicked(!CalendarTypeIsClicked);
    setSettingsIsClicked(false);
  };

  const handleSettingsClick = () => {
    setSettingsIsClicked(!settingsIsClicked);
    setCalendarTypeIsClicked(false);
  };

  const handleToggle = () => {
    if (pathname.includes("calendar")) {
      router.push("/appointments/list");
    }
    if (pathname.includes("list")) {
      router.push("/appointments/calendar");
    }
  };

  const handleTodayClick = () => {
    if (pathname.includes("week")) {
      router.push("/appointments/calendar/week");
    } else if (pathname.includes("month")) {
      router.push("/appointments/calendar/month");
    } else {
      router.push("/appointments/calendar/day");
    }
  };

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (
          (calendarTypeRef.current &&
            calendarTypeRef.current.contains(event.target as Node)) ||
          (settingsRef.current &&
            settingsRef.current.contains(event.target as Node))
        ) {
          
          
        } else {
          setSettingsIsClicked(false);
          setCalendarTypeIsClicked(false);
        }
      };

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, []);

  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <div className={styles.toggleContainer}>
          <input
            type="checkbox"
            id="toggle"
            className={styles.toggleInput}
            checked={pathname.includes("list") ? true : false}
            onChange={handleToggle}
          />
          <label htmlFor="toggle" className={styles.toggleLabel}>
            <span>
              <FaRegCalendarAlt size={16} />
            </span>
            <span>
              <FaList size={14} />
            </span>
          </label>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.IconContainer}>
          <button
            className={styles.calendarArrows}
            onClick={() => changeDate("decrease")}
          >
            <IoIosArrowBack size={24} />
          </button>
          <button
            className={styles.calendarArrows}
            onClick={() => changeDate("increase")}
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
        <span className={styles.dateText}>
          {pathname.includes("week") || pathname.includes("list")
            ? "Week of "
            : null}
          {searchParams.get("date") ? searchParams.get("date") : getDate()}
          <span className={styles.todayText}>
            {(pathname === "/appointments/calendar" ||
              pathname.includes("day")) &&
            (!searchParams.get("date") || searchParams.get("date") === date)
              ? "Today"
              : null}
          </span>
        </span>
        <button className={styles.todayButton} onClick={handleTodayClick}>
          Today
        </button>
        <div className={styles.buttonsContainer}>
          <div className={styles.dropdown} ref={settingsRef}>
            <button
              className={styles["settings-btn"]}
              onClick={handleSettingsClick}
            >
              <IoSettingsOutline fontSize={24} />
            </button>
            <div
              className={`${styles["dropdown-content"]} ${
                settingsIsClicked ? styles.active : null
              }`}
            >
              <Link href={"/appointments/calendar/day"}>Availability</Link>
            </div>
          </div>
          <div className={styles.dropdown} ref={calendarTypeRef}>
            <button
              className={styles.dropbtn}
              onClick={handleCalendarTypeClick}
            >
              {getCalendarType()} <IoMdArrowDropdown fontSize={20} />
            </button>
            <div
              className={`${styles["dropdown-content"]} ${
                CalendarTypeIsClicked ? styles.active : null
              }`}
            >
              <Link href={"/appointments/calendar/day"}>Day</Link>
              <Link href={"/appointments/calendar/week"}>Week</Link>
              <Link href={"/appointments/calendar/month"}>Month</Link>
            </div>
          </div>
          <button
            className={styles.newAppointmentButton}
            onClick={handleModalOpen}
          >
            + New Appointment
          </button>
        </div>
      </div>
      <CalendarHeader />
    </div>
  );
};

export default Header;
