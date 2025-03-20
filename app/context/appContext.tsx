"use client";
import { createDataContext } from "./createDataContext";

const appReducer = (
  state: { isModalOpen: boolean; modalContent: React.ReactNode | null },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "set_modal":
      return {
        ...state,
        isModalOpen: action.payload.isOpen,
        modalContent: action.payload.content || null,
      };
    default:
      return state;
  }
};

const openModal = (dispatch: (action: {}) => void) => {
  return (content: React.ReactNode) => {
    dispatch({ type: "set_modal", payload: { isOpen: true, content } });
  };
};

const closeModal = (dispatch: (action: {}) => void) => {
  return () => {
    dispatch({ type: "set_modal", payload: { isOpen: false, content: null } });
  };
};

export const { Context, Provider } = createDataContext(
  appReducer,
  { openModal, closeModal },
  { isModalOpen: false, modalContent: null }
);
