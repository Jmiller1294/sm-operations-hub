import { ReducerActions, ReducerState } from "next/dist/client/components/router-reducer/router-reducer-types";
import React, { useReducer, createContext, Reducer, ReactNode } from "react";

type Props = {
  children: ReactNode
}

interface MyContextProps {
  state: any;
  getEmployees: () => [];
}

export const createDataContext  = (
  reducer: any, 
  actions: any, 
  initialState: any
) => {
  const Context = createContext({} as MyContextProps);

  const Provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
      reducer, 
      initialState
    );

    const boundActions = {};
    for(const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{state, ...boundActions}}>
      {children}
    </Context.Provider>
  }

  return {Context, Provider}
};