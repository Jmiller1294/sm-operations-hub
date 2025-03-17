import React from 'react';
import styles from '../../styles/AppointmentsPage.module.css';
import { AppointmentDetailsProps } from '@/app/types/types';

const AppointmentDetails = ({ data, onClose, onClick} : AppointmentDetailsProps) => {

  return ( 
    <div className={styles.appointmentInfoCon}>
      <div className={styles.appointmentButtonCon}>
        <button 
          className={styles['close-button']}
          onClick={() => onClose()}
        >
          Close
        </button>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.appointmentbtns}
            onClick={() => onClick('edit')}
          >Edit</button>
          <button 
            className={styles.appointmentbtns}
            onClick={() => onClick('reschedule')}
          >Reschedule</button>
          <button 
            className={`${styles.appointmentbtns} ${styles.red}`}
            onClick={() => console.log('clicked')}
          >Cancel</button>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div>
          <div>
            <h2>{data.firstName} {data.lastName}</h2>
            <p className={styles['appointment-info-text']}>{data.type}</p>
            <p>{data.startTime} - {data.endTime}</p>
            <p>{data.date} - {data.duration} mins</p>
            <p>with {data.calendar}</p>
          </div>
          <div className={styles['appointment-info-con-2']}>
            <h4>Appointment Info</h4>
            <div className={styles.textCon}>
              <p>Email</p>
              <p style={{marginLeft: 'auto'}}>{data.email}</p>
            </div>
            <div className={styles.textCon}>
              <p>Phone</p>
              <p style={{marginLeft: 'auto'}}>{data.phone}</p>
            </div>
            <div className={styles.textCon}>
              <p>Location</p>
              <p style={{marginLeft: 'auto'}}>{data.location}</p>
            </div>
            <div className={styles.textCon}>
              <p>Price</p>
              <p style={{marginLeft: 'auto'}}>${data.price}</p>
            </div>
          </div>
          <div className={styles['appointment-info-con-2']}>
            <h4>Notes</h4>
            <p style={{borderBottom: '1px solid rgb(225, 225, 225)'}}>No Notes</p>
          </div>
          <div className={styles['appointment-info-con-2']}>
            <h4>History</h4>
            <div>
              <p style={{borderBottom: '1px solid rgb(225, 225, 225)'}}>Regular Cleaning</p>
            </div>
            <p style={{borderBottom: '1px solid rgb(225, 225, 225)'}}>Regular Cleaning</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails