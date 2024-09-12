import { useContext, useEffect, useState } from "react";
import { columns, Employee } from "@/components/employees/columns";
import { DataTable } from "@/components/employees/data-table";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
async function getData(): Promise<Employee[]> {
  const apiUrl = import.meta.env.VITE_API_URL; // Access the VITE_API_URL environment variable

  if (!apiUrl) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const response = await axios.get(`${apiUrl}/admin/employee`);
    return response.data.employees;
  } catch (error) {
    toast.error("Error fetching data");
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
  const { logout } = useContext(AuthContext);

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Employees</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-2 text-sm rounded"
        >
          Logout
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
