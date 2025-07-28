import React from "react";

const BasicButton = ({
  onClick,
  rounded,
  color,
  children,
  textColor,
  fontSize,
}) => {
  return (
    <button
      className={`flex flex-row justify-center items-center h-fit w-fit ${
        rounded ? "rounded-3xl" : "rounded-lg"
      } ${fontSize} ${textColor} ${color} font-semibold cursor-pointer pt-2.5 pb-2.5 pl-3.5 pr-3.5 border-1 text-center`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default BasicButton;
