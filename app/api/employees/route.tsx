export const employees = [
  {
    id: 1,
    name: "Millieann",
    workingHours: 4,
    availabilityStartTime: "10:00 am",
    availabilityEndTime: "6:00 pm",
  },
  {
    id: 2,
    name: "Justin",
    workingHours: 6,
    availabilityStartTime: "10:00 am",
    availabilityEndTime: "6:00 pm",
  },
  {
    id: 3,
    name: "Shine Masters",
    workingHours: 8,
    availabilityStartTime: "10:00 am",
    availabilityEndTime: "6:00 pm",
  },
];

export async function GET() {
  return Response.json(employees);
}

export async function POST(request: Request) {
  const employee = await request.json();
  const newEmployee = {
    id: employees.length + 1,
    name: employee.name,
    workingHours: 4,
    availabilityStartTime: "10:00 am",
    availabilityEndTime: "6:00 pm",
  };
  employees.push(newEmployee);
  return new Response(JSON.stringify(newEmployee), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
