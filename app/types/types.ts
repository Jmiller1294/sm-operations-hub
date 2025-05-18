import { ReactNode } from "react";
import { IconType } from "react-icons";

export type DashBoardCardProps = {
  size: string;
  children: ReactNode;
};

export type Appointment = {
  id: 1;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date: string;
  start_time: string;
  end_time: string;
  date_created: string;
  datetime: string;
  price: number;
  paid: string;
  amount_paid: number;
  type: string;
  appointment_type_id: number;
  add_on_ids: number[];
  class_id: number;
  duration: number;
  calendar: string;
  calendar_id: number;
  can_client_cancel: boolean;
  can_client_reschedule: boolean;
  location: string;
  confirmation_page: string;
  forms_text: string
  notes: string;
  timezone: string;
};

export type Availability = {
  id: number,
  day: string,
  active: boolean,
  start_time: string,
  end_time: string
}

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
  icon?: IconType;
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
  isExpanded?: any;
};

export type DatetimePickerProps = {
  onClick: () => void;
};

export type NewAppointmentFormProps = {
  onClose: () => void;
};
