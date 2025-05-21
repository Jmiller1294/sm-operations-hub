'use server'

import { updateAvailability } from "@/app/lib/appointments";

export async function saveAvailability(availability: any[]) {
  // Optional: validate the data before saving
  updateAvailability(availability)
}

