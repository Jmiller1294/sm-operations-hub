import React from 'react';
import styles from '../styles/Modal.module.css';
import { ModalProps } from '../types/types';


const Modal = ({ isOpen, onClose, children } : ModalProps) => {
  return (
    <div>
      <div 
        className={
          isOpen ? `${styles['modal-overlay']} ${styles['open-overlay']}` 
          : styles['modal-overlay']} onClick={onClose}
      >
      </div>
      <div 
        className={
          isOpen ? `${styles['side-modal']} ${styles.open}` 
          : styles['side-modal']}
      >
        <div className={styles['modal-content']}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal