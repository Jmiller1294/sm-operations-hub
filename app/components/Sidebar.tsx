import React from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { FaBook, FaCalendar, FaFolder, FaHome, FaServicestack } from 'react-icons/fa';
import { FaGear, FaPerson } from 'react-icons/fa6';
import { Item } from '../types/types';


const navList = [
  {icon: <FaHome />, title: 'Dashboard', path: '/'},
  {icon: <FaCalendar />, title: 'Appointments', path: '/appointments'},
  {icon: <FaBook />, title: 'Quotes', path: '/'},
  {icon: <FaFolder />, title: 'Scheduling', path: '/'},
  {icon: <FaPerson />, title: 'Customers', path: '/'},
  {icon: <FaPerson />, title: 'Employees', path: '/'},
  {icon: <FaServicestack />, title: 'Services', path: '/'},
  {icon: <FaHome />, title: 'Inventory', path: '/'},
  {icon: <FaHome />, title: 'Booking', path: '/'},
  {icon: <FaHome />, title: 'Leads', path: '/'},
  {icon: <FaGear />, title: 'Settings', path: '/'},
]

const Sidebar = () => {

  return (
    <div className={styles.container}>
      {navList.map((item:Item, index: number) => (
        <Link 
          key={index}
          style={{display: 'flex', flexDirection: 'row', width: '100%', height: '2.2rem', alignItems: 'center', color: '#FFFFFF', textDecorationLine: 'none'}}
          href={item.path}
        >
          {item.icon}
          <div style={{fontSize: '18px', marginLeft: '10px'}}>{item.title}</div>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar