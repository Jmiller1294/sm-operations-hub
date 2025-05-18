"use client"
import { createContext, ReactNode, useState } from 'react';
import { Appointment, Availability, Employee,  } from "@/app/types/types";

type ContextType = {
  appointments: Appointment[],
  employees: Employee[],
  availability: Availability[]
};

type AppointmentsProviderProps = {
  children: ReactNode;
  appointments?: Appointment[];
  employees?: Employee[];
  availability?: Availability[]; 
};

const AppointmentsContext = createContext<ContextType>({
  appointments: [],
  employees: [],
  availability: []
} as ContextType);

export function AppointmentsProvider({
  children,
  appointments = [],
  employees = [],
  availability = [],
}: AppointmentsProviderProps) {
  const [appointmentsState, setAppointments] =
    useState<Appointment[]>(appointments);
  const [employeesState, setEmployees] = useState<Employee[]>(employees);
  const [availabilityState, setAvailability] = useState<any[]>(availability);

  const contextValue: ContextType = {
    appointments: appointmentsState,
    employees: employeesState,
    availability: availabilityState,
  };

  return (
    <AppointmentsContext.Provider value={contextValue}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export default AppointmentsContext;