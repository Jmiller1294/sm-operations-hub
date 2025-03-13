'use client'
import { createDataContext } from "./createDataContext";

const appointmentsReducer = (state: { employees: [] }, action: {type: string, payload: []}) => {
  switch(action.type) {
    case 'get_employees':
      return {
        ...state, 
        employees: action.payload
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

export const {Context, Provider} = createDataContext(
  appointmentsReducer,
  {getEmployees},
  { employees: [] }
);