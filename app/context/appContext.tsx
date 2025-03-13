"use client"
import { createDataContext } from "./createDataContext";

const appReducer = (state, action) => {
  switch(action.type) {
    case 'set_modal':
      return {
        ...state, 
        isModalOpen: action.payload
      };
    default:
      return state;
  }
};

const openModal = (dispatch) => {
  dispatch({ type: 'set_modal', payload: true});
};
const closeModal = (dispatch) => {
  dispatch({ type: 'set_modal', payload: false});
};

export const {Context, Provider} = createDataContext(
  appReducer,
  {openModal, closeModal},
  {}
);