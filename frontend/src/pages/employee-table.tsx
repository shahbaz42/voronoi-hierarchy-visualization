import { useEffect, useState } from "react";
import { columns, Employee } from "@/components/employees/columns";
import { DataTable } from "@/components/employees/data-table";
import axios from 'axios';

async function getData(): Promise<Employee[]> {
  const apiUrl = import.meta.env.VITE_API_URL; // Access the VITE_API_URL environment variable

  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables.');
  }

  try {
    const response = await axios.get(`${apiUrl}/employees`);
    return response.data.employees
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw error to be handled by the caller
  }
}

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
  </div>
);

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
    return <LoadingOverlay />;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Employees</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
