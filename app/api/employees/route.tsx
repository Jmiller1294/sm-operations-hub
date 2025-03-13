export const employees = [
  {
    id: 1,
    name: "Millieann",
    hours: 4
  },
  {
    id: 2,
    name: "Justin",
    hours: 6
  },
  {
    id: 3,
    name: "Shine Masters",
    hours: 8
  }
]

export async function GET() {
  return Response.json(employees);
}

export async function POST(request: Request) {
  const employee = await request.json();
  const newEmployee = {
    id: employees.length + 1,
    name: employee.name,
    hours: 10
  };
  employees.push(newEmployee);
  return new Response(JSON.stringify(newEmployee), {
    headers: {
      "Content-Type": "application/json"
    },
    status: 201,
  })
}

