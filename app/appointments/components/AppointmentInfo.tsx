"use client";
import React, { useState } from "react";
import { AppointmentInfoProps } from "@/app/types/types";
import AppointmentDetails from "./AppointmentDetails";
import RescheduleAppointmentForm from "@/app/components/forms/RescheduleAppointmentForm";
import EditAppointmentForm from "@/app/components/forms/EditAppointmentForm";


const AppointmentInfo = ({ data, onClose }: AppointmentInfoProps) => {
  const [view, setView] = useState("details");

  const handleClick = (viewType: string) => {
    setView(viewType);
  };

  switch (view) {
    case "details":
      return (
        <AppointmentDetails
          data={data}
          onClose={onClose}
          onClick={handleClick}
        />
      );
    case "edit":
      return (
        <EditAppointmentForm
          data={data}
          onClose={onClose}
          onClick={handleClick}
        />
      );
    case "reschedule":
      return <RescheduleAppointmentForm />;
    case "cancel":
      return null;
    default:
      return (
        <AppointmentDetails
          data={data}
          onClose={onClose}
          onClick={handleClick}
        />
      );
  }
};

export default AppointmentInfo;
