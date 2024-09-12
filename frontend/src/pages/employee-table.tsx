import { useEffect, useState } from "react";
import { columns, Employee } from "@/components/employees/columns";
import { DataTable } from "@/components/employees/data-table";

async function getData(): Promise<Employee[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
    {
      id: "1",
      name: "Shahbaz",
      department: "CS",
      specialization: "Software Engineering",
      email: "shahbaz@email.com",
      profile: "https://www.linkedin.com/in/shahbaz42",
    },
    {
      id: "2",
      name: "Madhavan",
      department: "Mechanical",
      specialization: "Automobile Engineering",
      email: "madhavan@email.com",
      profile: "https://www.linkedin.com/in/madhavan",
    },
  ];
}

export default function EmployeeData() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Employees</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
