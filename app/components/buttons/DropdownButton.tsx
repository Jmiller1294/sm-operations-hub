import React from "react";
import Link from "next/link";

const DropdownButton = ({
  children,
  onClick,
  rounded,
  fontSize,
  textColor,
  color,
  border,
  padding,
  active,
  ref
}) => {
  return (
    <div className={`relative inline-block w-fit h-fit`} ref={ref}>
      <button
        className={`flex flex-row justify-center items-center h-fit w-fit ${
          rounded ? "rounded-3xl" : "rounded-lg"
        } ${fontSize} ${textColor} font-semibold cursor-pointer ${
          padding ? "pt-2.5 pb-2.5 pl-3.5 pr-3.5" : ""
        } ${color} ${border} text-center`}
        onClick={() => onClick()}
      >
        {children}
      </button>
      <div
        className={`absolute bg-gray-200 min-w-44 shadow-xl rounded-md ${
          active ? "block" : "hidden"
        }`}
      >
        <Link
          href={"/appointments/calendar/day"}
          className="pt-2 pb-2 pr-2 pl-2 text-decoration-line-none block z-10"
        >
          Day
        </Link>
        <Link
          href={"/appointments/calendar/week"}
          className="pt-2 pb-2 pr-2 pl-2 text-decoration-line-none block z-10"
        >
          Week
        </Link>
        <Link
          href={"/appointments/calendar/month"}
          className="pt-2 pb-2 pr-2 pl-2 text-decoration-line-none block z-10"
        >
          Month
        </Link>
      </div>
    </div>
  );
};

export default DropdownButton;
