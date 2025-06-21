'use server';
// This function is a server action that refreshes the availability data
import { getAvailability } from "@/app/lib/availibility";

export async function refreshAvailability() {
  const newAvailability = await getAvailability();
  return newAvailability;
}