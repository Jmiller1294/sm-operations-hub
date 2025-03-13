import React from 'react';
import CalendarHeader from './components/CalendarHeader';
import { LayoutProps } from '@/.next/types/app/layout';


const CalendarLayout = ({ children } : LayoutProps) => {
  return (
    <>
      <CalendarHeader />
      <main>{children}</main>
    </>
  )
}

export default CalendarLayout