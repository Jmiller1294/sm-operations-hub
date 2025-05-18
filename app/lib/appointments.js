import Database from "better-sqlite3";

let db = null;

async function getDb() {
  if (!db) {
    db = new Database("company.db");
    db.pragma("journal_mode = WAL"); // Enable Write-Ahead Logging for performance
  }
  return db;
}

export async function getAppointments() {
  const db = await getDb();
  const appointments = db.prepare("SELECT * FROM appointments").all();
  return appointments;
}
