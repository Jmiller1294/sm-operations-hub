"use client";
import React, { useContext } from "react";
import styles from "../styles/Modal.module.css";
import { Context as AppContext } from "../context/appContext";

const Modal = () => {
  const { closeModal, state } = useContext(AppContext);

  return (
    <div>
      <div
        className={`${styles["open-overlay"]} 
          ${state.isModalOpen
            ? styles["modal-overlay"]
            : null}`
        }
        onClick={closeModal}
      ></div>
      <div
        className={
          state.isModalOpen
            ? `${styles["side-modal"]} ${styles.open}`
            : styles["side-modal"]
        }
      >
        <div className={styles["modal-content"]}>{state.modalContent}</div>
      </div>
    </div>
  );
};

export default Modal;
