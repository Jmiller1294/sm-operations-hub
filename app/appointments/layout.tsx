import React from 'react';
import Header from './components/Header';
import { LayoutProps } from '@/.next/types/app/layout';
import { Provider } from '../context/appointmentsContext';

const AppointmentsPageLayout = ({ children } : LayoutProps) => {
  return (
    <>
      <Provider>
        <Header />
        <main>{children}</main>
      </Provider>
    </>
  )
}

export default AppointmentsPageLayout