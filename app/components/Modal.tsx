'use client';
import React, { useContext, useEffect } from 'react';
import styles from '../styles/Modal.module.css';
import { ModalProps } from '../types/types';
import { Context as AppContext } from '../context/appContext';


const Modal = () => {
  const { closeModal, state } = useContext(AppContext);
  useEffect(() => {
    console.log(state)
  }, [state])

  
  return (
    <div>
      <div 
        className={
          state.isModalOpen ? `${styles['modal-overlay']} ${styles['open-overlay']}` 
          : styles['modal-overlay']} onClick={closeModal}
      >
      </div>
      <div 
        className={
          state.isModalOpen ? `${styles['side-modal']} ${styles.open}` 
          : styles['side-modal']}
      >
        <div className={styles['modal-content']}>
        {state.modalContent}
        </div>
      </div>
    </div>
  );
}

export default Modal