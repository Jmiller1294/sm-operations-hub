// {
//   id: 2,
//   firstName: "Justin",
//   lastName: "McTest",
//   phone: "",
//   address: '2222 1st street',
//   email: "justin.mctest@example.com",
//   date: "February 20, 2025",
//   startTime: "2:00pm",
//   endTime: "5:15pm",
//   dateCreated: "June 17, 2013",
//   datetime: "2013-07-02T10:15:00-0700",
//   price: "10.00",
//   paid: "no",
//   amountPaid: "0.00",
//   type: "Regular Visit",
//   notes: "dsfsdfdfdsfdsfdfdfdfdfsd",
//   appointmentTypeID: 1,
//   addonIDs: [
//     1
//   ],
//   duration: "480",
//   calendar: "Millieann",
//   calendarID: 1,
//   canClientCancel: false,
//   canClientReschedule: false,
//   location: "",
//   timezone: "America/New_York",
//   forms: [
//     {
//       "id": 1,
//       "name": "Example Intake Form",
//       "values": [
//         {
//           "value": "yes",
//           "name": "Is this your first visit?",
//           "fieldID": 1,
//           "id": 21502993
//         },
//         {
//           "value": "Ninja",
//           "name": "What is your goal for this appointment?",
//           "fieldID": 2,
//           "id": 21502994
//         }
//       ]
//     },
//   ]
// },
// {
//   id: 3,
//   firstName: "Bob",
//   lastName: "McTest",
//   phone: "917-999-2311",
//   address: '2222 1st street',
//   email: "bob.mctest@example.com",
//   date: "February 19, 2025",
//   startTime: "1:00am",
//   endTime: "11:15am",
//   dateCreated: "June 17, 2013",
//   datetime: "2013-07-02T10:15:00-0700",
//   price: "10.00",
//   paid: "no",
//   amountPaid: "0.00",
//   type: "Regular Visit",
//   notes: "dsfsdfdfdsfdsfdfdfdfdfsd",
//   appointmentTypeID: 1,
//   addonIDs: [
//     1
//   ],
//   duration: "120",
//   calendar: "Justin",
//   calendarID: 2,
//   canClientCancel: false,
//   canClientReschedule: false,
//   location: "",
//   timezone: "America/New_York",
//   forms: [
//     {
//       "id": 1,
//       "name": "Example Intake Form",
//       "values": [
//         {
//           "value": "yes",
//           "name": "Is this your first visit?",
//           "fieldID": 1,
//           "id": 21502993
//         },
//         {
//           "value": "Ninja",
//           "name": "What is your goal for this appointment?",
//           "fieldID": 2,
//           "id": 21502994
//         }
//       ]
//     },
//   ]
// },
// {
//   id: 4,
//   firstName: "Bob",
//   lastName: "McTest",
//   phone: "",
//   address: '2222 1st street',
//   email: "bob.mctest@example.com",
//   date: "February 18, 2025",
//   startTime: "11:15am",
//   endTime: "11:15am",
//   dateCreated: "June 17, 2013",
//   datetime: "2013-07-02T10:15:00-0700",
//   price: "10.00",
//   paid: "no",
//   amountPaid: "0.00",
//   type: "Regular Visit",
//   notes: "dsfsdfdfdsfdsfdfdfdfdfsd",
//   appointmentTypeID: 1,
//   addonIDs: [
//     1
//   ],
//   duration: "120",
//   calendar: "Shine Masters",
//   calendarID: 3,
//   canClientCancel: false,
//   canClientReschedule: false,
//   location: "",
//   timezone: "America/New_York",
//   forms: [
//     {
//       "id": 1,
//       "name": "Example Intake Form",
//       "values": [
//         {
//           "value": "yes",
//           "name": "Is this your first visit?",
//           "fieldID": 1,
//           "id": 21502993
//         },
//         {
//           "value": "Ninja",
//           "name": "What is your goal for this appointment?",
//           "fieldID": 2,
//           "id": 21502994
//         }
//       ]
//     },
//   ]
// },



'use client'
import React from 'react';
import CalendarPage from './calendar/page';


const AppointmentsPage = () => {
  return <CalendarPage />
}

export default AppointmentsPage