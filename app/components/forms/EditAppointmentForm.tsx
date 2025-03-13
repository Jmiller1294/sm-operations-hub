import React, { useState } from 'react';
import styles from '../../styles/Forms.module.css';
import { EditAppointmentFormProps } from '@/app/types/types';

const EditAppointmentForm = ({data, onClose, onCancel, onSave} : EditAppointmentFormProps) => {
  const [calendar, setCalendar] = useState('hello');
  const [appointment, setAppointment] = useState('');
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [address, setAddress] = useState(data.address);
  const [notes, setNotes] = useState(data.notes);



  return (
    <div className={styles.editInfoCon}>
      <div className={styles.buttonCon}>
        <button onClick={onClose} className={styles['close-button']}>
          Close
        </button>
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.button} ${styles.black}`}
            onClick={() => onSave('appointment info', data.id,)}
          >Save</button>
          <button className={styles.button} onClick={() => onCancel('appointment info', data.id)}>Cancel Edit</button>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.textContainer}>
          <p>Date</p>
          <span>{data.date}</span>
        </div>
        <div className={styles.textContainer}>
          <p>Time</p>
          <span>{data.startTime} - {data.endTime}</span>
        </div>
        <div className={styles.textContainer}>
          <label>Calendar</label>
          <select 
            name="cars" 
            id="cars" 
            className={styles['input-text']}
            value={calendar}
            onChange={(e) => setCalendar(e.target.value)}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className={styles.textContainer}>
          <label>Appointment Type</label>
          <select 
            name="cars" 
            id="cars" 
            className={styles['input-text']}
            value={appointment}
            onChange={(e) => setAppointment(e.target.value)}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className={styles.textContainer}>
          <label>First Name</label>
          <input 
            type='text' 
            className={styles['input-text']}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Last Name</label>
          <input 
            type='text' 
            className={styles['input-text']}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Email</label>
          <input 
            type='text' 
            className={styles['input-text']}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Phone</label>
          <input 
            type='text' 
            className={styles['input-text']}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.textContainer}>
          <label>Client Address</label>
          <input 
            type='text' 
            className={styles['input-text']}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div style={{marginTop: '30px'}}>
          <h4>Notes</h4>
          <textarea 
            className={styles['input-textarea']}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

export default EditAppointmentForm