'use client'
import { createDataContext } from "./createDataContext";

const appointmentsReducer = (state: { employees: [], appointment: [] }, action: {type: string, payload: []}) => {
  switch(action.type) {
    case 'get_employees':
      return {
        ...state, 
        employees: action.payload
      };
    case 'get_appointments':
    return {
      ...state, 
      appointments: action.payload
    };
    default:
      return state;
  }
};

const getEmployees = (dispatch: ({}) => void) => {
  return async () => {
    const url = "http://localhost:3000/api/employees";
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: 'get_employees', payload: data});
  }
}

const getAppointments = (dispatch: ({}) => void) => {
  return async () => {
    const url = "http://localhost:3000/api/appointments";
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: 'get_appointments', payload: data});
  }
}

export const {Context, Provider} = createDataContext(
  appointmentsReducer,
  {
    getEmployees,
    getAppointments
  },
  { 
    employees: [], 
    appointments: [] 
  }
);