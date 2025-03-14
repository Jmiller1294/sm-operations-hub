import { ReactNode } from "react";

export type DashBoardCardProps = {
  size:string;
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
  appointmentTypeID: number,
  duration: number;
  calendar: string;
  calendarID: number,
  canClientCancel: false,
  canClientReschedule: false,
  location: string;
  timezone: string;
}

export type AccordionItem = {
  title: string;
  content: string;
}   

export type AppointmentInfoProps = {
  data: unknown;
  onClose: (type:string, id:number) => void;
  open: (type:string, id:number) => void;
};

export type Item = {
  icon: ReactNode;
  title: string;
  path: string;
};

export type ModalProps = {
  isOpen:  boolean;
  onClose: () => void; 
  children: ReactNode;
}

export type EditAppointmentFormProps = {
  data: unknown; 
  onClose: (type:string, id:number) => void;
  onCancel: (type:string, id:number) => void; 
  onSave: (type:string, id:number) => void;
}

export type NewAppointmentFormProps = {
  data: unknown; 
  onClose: (type:string, id:number) => void;
}

export type CalendarHeaderProps = {
  type: string; 
  employees: Employee[]; 
  daysOfWeek: Date[];
}

export type Employee = {
  id: number;
  name: string;
  hours: number;
}
