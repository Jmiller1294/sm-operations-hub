const sql = require("better-sqlite3");
const db = sql("company.db");

const dummyDays = [
  {
    day: "Monday",
    active: 1,
    start_time: "09:00",
    end_time: "17:30",
  },
  {
    day: "Tuesday",
    active: 1,
    start_time: "10:00",
    end_time: "19:30",
  },
  {
    day: "Wednesday",
    active: 1,
    start_time: "09:00",
    end_time: "17:00",
  },
  {
    day: "Thursday",
    active: 1,
    start_time: "09:00",
    end_time: "17:30",
  },
  {
    day: "Friday",
    active: 1,
    start_time: "09:00",
    end_time: "17:30",
  },
  {
    day: "Saturday",
    active: 0,
    start_time: null,
    end_time: null,
  },
  {
    day: "Sunday",
    active: 0,
    start_time: null,
    end_time: null,
  },
];

const dummyAppointments = [
  {
    id: 1,
    first_name: "Bob",
    last_name: "McTest",
    phone: "333-333-3333",
    email: "bob.mctest@example.com",
    date: "July 2, 2013",
    start_time: "10:15am",
    end_time: "11:15am",
    date_created: "June 17, 2013",
    datetime: "2013-07-02T10:15:00-0500",
    price: "10.00",
    paid: "no",
    amount_paid: "0.00",
    type: "Regular Visit",
    appointment_type_id: 1,
    add_on_ids: [1],
    class_id: null,
    duration: "60",
    calendar: "Justin Miller",
    calendar_id: 1,
    can_client_cancel: 0,
    can_client_reschedule: 0,
    location: "",
    confirmation_page: "",
    forms_text: "...",
    notes: "Notes",
    timezone: "America/New_York",
  },
];

const dummyEmployees = [
  {
    id: 1,
    name: "Millieann",
    hours_worked: 4,
    start_time: "10:00 am",
    end_time: "6:00 pm",
  },
  {
    id: 2,
    name: "Justin",
    hours_worked: 4,
    start_time: "10:00 am",
    end_time: "6:00 pm",
  },
  {
    id: 3,
    name: "Shine Masters",
    hours_worked: 4,
    start_time: "10:00 am",
    end_time: "6:00 pm",
  },
];

const dummyForms = [
  {
    id: 1,
    appointment_id: 1,
    name: "Example Intake Form"
  },
]

const dummyFormValues = [
  {
    id: 1,
    form_id: 1,
    field_id: 1,
    value: "yes",
    name: "Is this your first visit?",
  },
  {
    id: 2,
    form_id: 1,
    field_id: 2,
    value: "Ninja",
    name: "What is your goal for this appointment?",
  },
];


db.prepare(
      `
   CREATE TABLE IF NOT EXISTS availability (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       day TEXT NOT NULL,
       active BOOLEAN NOT NULL,
       start_time TEXT,
       end_time TEXT
    )
`
    )
    .run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    email TEXT,
    date TEXT,
    start_time TEXT,
    end_time TEXT,
    date_created TEXT,
    datetime TEXT,
    price TEXT,
    paid TEXT,
    amount_paid TEXT,
    type TEXT,
    appointment_type_id INTEGER,
    class_id INTEGER,
    duration TEXT,
    calendar TEXT,
    calendar_id INTEGER,
    can_client_cancel BOOLEAN,
    can_client_reschedule BOOLEAN,
    location TEXT,
    confirmation_page TEXT,
    notes TEXT,
    timezone TEXT
);
`
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS forms (
      id INTEGER PRIMARY KEY,
      appointment_id INTEGER,
      name TEXT,
      FOREIGN KEY (appointment_id) REFERENCES appointments(id)
    );
  `
).run();  


db.prepare(
  `
    CREATE TABLE IF NOT EXISTS form_values (
      id INTEGER PRIMARY KEY,
      form_id INTEGER,
      field_id INTEGER,
      name TEXT,
      value TEXT,
      FOREIGN KEY (form_id) REFERENCES forms(id)
    );
  `
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    hours_worked INTEGER NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL
  )
`
).run();

function initData() {
  const stmt = db.prepare(`
    INSERT INTO availability VALUES (
      null,
      @day,
      @active,
      @start_time,
      @end_time
    )
  `);

  for (const day of dummyDays) {
    stmt.run(day);
  }

  const stmt2 = db.prepare(`
    INSERT INTO appointments VALUES (
      null,
      @first_name,
      @last_name,
      @phone,
      @email,
      @date,
      @start_time,
      @end_time,
      @date_created,
      @datetime,
      @price,
      @paid,
      @amount_paid,
      @type,
      @appointment_type_id,
      @class_id,
      @duration,
      @calendar,
      @calendar_id,
      @can_client_cancel,
      @can_client_reschedule,
      @location,
      @confirmation_page,
      @notes,
      @timezone 
    )
  `);

  for (const appointment of dummyAppointments) {
    stmt2.run(appointment);
  }

  const stmt3 = db.prepare(`
      INSERT INTO employees VALUES (
         null,
         @name,
         @hours_worked,
         @start_time,
         @end_time
      )
   `);

  for (const employee of dummyEmployees) {
    stmt3.run(employee);
  }

  const stmt4 = db.prepare(`
    INSERT INTO forms VALUES (
      null,
      @appointment_id, 
      @name
    )
  `);

  for (const form of dummyForms) {
    stmt4.run(form);
  }

  const stmt5 = db.prepare(`
    INSERT INTO form_values VALUES (
      null,
      @form_id, 
      @field_id, 
      @name, 
      @value
    )
  `);

  for (const formValue of dummyFormValues) {
    stmt5.run(formValue);
  }
}

initData();
