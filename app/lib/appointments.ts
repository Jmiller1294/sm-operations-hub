import Database from "better-sqlite3";
import { Availability } from "../types/types";
let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    db = new Database("company.db");
    db.pragma("journal_mode = WAL"); // Enable Write-Ahead Logging for performance
  }
  return db;
}

export function getAppointments() {
  const db = getDb();
  const appointments = db.prepare("SELECT * FROM appointments").all();
  return appointments;
}

export function updateAvailability(availability: Availability[]) {
  // Check if the availability array is empty
  if (availability.length === 0) {
    return;
  }
  const db = getDb();
  const stmt = db.prepare("UPDATE availability SET day = ?, active = ?, start_time = ?, end_time = ? WHERE day = ?");

  const transaction = db.transaction((data: Availability[]) => {
    data.forEach((row:any) => {
      stmt.run(row.day, row.active, row.start_time, row.end_time, row.day);
    });
  });

  transaction(availability);
}

