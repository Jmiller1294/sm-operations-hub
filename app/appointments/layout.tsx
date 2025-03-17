'use client'
import React, { useContext } from 'react';
import Header from './components/Header';
import { LayoutProps } from '@/.next/types/app/layout';
import Modal from '../components/Modal';
import { Context } from '../context/appContext';


const AppointmentsPageLayout = ({ children } : LayoutProps) => {
   const { state } = useContext(Context);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Modal />
    </>
  )
}

export default AppointmentsPageLayout