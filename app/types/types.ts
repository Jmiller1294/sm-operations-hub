import { ReactNode } from "react";

export type DashBoardCardProps = {
  size: string;
  children: ReactNode;
};

export type Appointment = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
  startDateTime: string;
  endDateTime: string;
  dateCreated: string;
  price: string;
  paid: string;
  amountPaid: string;
  type: string;
  notes: string;
  appointmentTypeID: number;
  duration: number;
  calendar: string;
  calendarID: number;
  canClientCancel: false;
  canClientReschedule: false;
  location: string;
  timezone: string;
};

export type AccordionItem = {
  title: string;
  content: string;
};

export type AppointmentDetailsProps = {
  data: Appointment;
  onClose: () => void;
  onClick: (type: string) => void;
};

export type AppointmentInfoProps = {
  data: Appointment;
  onClose: () => void;
};

export type Item = {
  icon?: ReactNode;
  title: string;
  path: string;
  subPaths: any[];
};

export type ModalProps = {
  isOpen: boolean;
};

export type EditAppointmentFormProps = {
  data: Appointment;
  onClose: () => void;
  onClick: (type: string) => void;
};

export type CalendarHeaderProps = {
  type: string;
  employees: Employee[];
  daysOfWeek: Date[];
};

export type Employee = {
  id: number;
  name: string;
  workingHours: number;
  availabilityStartTime: string;
  availabilityEndTime: string;
};

export type AccordianProps = {
  title: string;
  children: ReactNode;
  id?: number;
  step?: number;
  icon?: ReactNode;
  style?: any;
};

export type DatetimePickerProps = {
  onClick: () => void;
};

export type NewAppointmentFormProps = {
  onClose: () => void;
};
