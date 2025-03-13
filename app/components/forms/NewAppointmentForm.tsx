import React from 'react';
import styles from '../../styles/Forms.module.css';
import Accordion from '../Accordian';
import { NewAppointmentFormProps } from '@/app/types/types';

const accordionData = [
  {
    title: 'Appointment Type',
    content: ''
  },
  {
    title: 'Date & Time',
    content: ''
  },
  {
    title: 'Client Info',
    content: ''
  },
  {
    title: 'Appointment Info',
    content: ''
  }
];

const NewAppointmentForm = ({data, onClose} : NewAppointmentFormProps) => {

  return (
    <div>
      <button onClick={onClose} className={styles['close-button']}>
        Close NewAppointmentForm {data?.id}
      </button>
      <div>
        {accordionData.map(({ title, content }, index:number) => (
          <Accordion 
            key={index}
            title={title} 
            content={content} 
          />
        ))}
      </div>
    </div>
  )
}

export default NewAppointmentForm