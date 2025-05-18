import Database from "better-sqlite3";

let db = null;

async function getDb() {
  if (!db) {
    db = new Database("company.db");
    db.pragma("journal_mode = WAL"); // Enable Write-Ahead Logging for performance
  }
  return db;
}

export async function getAvailability() {
  const db = await getDb();
  const availability = db.prepare("SELECT * FROM availability").all();
  return availability;
}
