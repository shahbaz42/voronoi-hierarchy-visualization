import { useEffect, useState } from "react";
// @ts-ignore
import FoamTree from "@carrotsearch/foamtree";
import { Employee } from "@/components/employees/columns";
import logo from "../assets/logo.jpg";
import axios from "axios";

function nestData(flatData: Employee[]) {
  const nestedData: {
    groups: {
      label: string;
      weight: number;
      groups: any[];
      specializationMap?: Record<string, any>;
    }[];
  } = { groups: [] };
  const departmentMap: Record<
    string,
    {
      label: string;
      weight: number;
      groups: any[];
      specializationMap?: Record<string, any>;
    }
  > = {};

  flatData.forEach((item: Employee) => {
    // Find or create the department group using a hashmap for O(1) lookup
    if (!departmentMap[item.department]) {
      departmentMap[item.department] = {
        label: item.department,
        weight: 0,
        groups: [],
      };
      nestedData.groups.push(departmentMap[item.department]);
    }
    const departmentGroup = departmentMap[item.department];

    // Find or create the specialization group within the department using a hashmap
    if (!departmentGroup.specializationMap) {
      departmentGroup.specializationMap = {};
    }
    if (!departmentGroup.specializationMap[item.specialization]) {
      departmentGroup.specializationMap[item.specialization] = {
        label: item.specialization,
        weight: 0,
        groups: [],
      };
      departmentGroup.groups.push(
        departmentGroup.specializationMap[item.specialization]
      );
    }
    const specializationGroup =
      departmentGroup.specializationMap[item.specialization];

    // Add the subject as a group within the specialization
    specializationGroup.groups.push({ label: item.name, weight: 0 });
  });

  // Assign weights based on the number of groups within each level
  nestedData.groups.forEach((department) => {
    department.groups.forEach((specialization) => {
      specialization.weight = specialization.groups.length; // Weight is the number of subjects
    });
    department.weight = department.groups.length; // Weight is the number of specializationes
    // Cleanup specializationMap as it's not needed in the final output
    delete department.specializationMap;
  });

  return nestedData;
}

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
  </div>
);

async function getData(): Promise<Employee[]> {
  const apiUrl = import.meta.env.VITE_API_URL; // Access the VITE_API_URL environment variable

  if (!apiUrl) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const response = await axios.get(`${apiUrl}/employees`);
    return response.data.employees;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw error to be handled by the caller
  }
}

export default function VoronoiVisualization() {
  const [flatData, setFlatData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getData();
      setLoading(false);
      setFlatData(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const foamtree = new FoamTree({
      id: "foamtree", // The ID of the container element where the chart will render
      dataObject: nestData(flatData), // The nested data object
    });

    // Handle window resize and adjust FoamTree size
    const handleResize = () => {
      foamtree.resize(); // Resize FoamTree on window resize
    };

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      foamtree.dispose();
    };
  }, [flatData]);

  return (
    <div>
      {loading && <LoadingOverlay />}
      <div className="parent-container">
        <div className="left-container">
          <div id="foamtree" style={{ width: "100%", height: "100%" }}></div>
        </div>
        <div className="right-container p-4">
          <div className="static-header-container">
            <div className="image-box">
              <img className="employee-img" src={logo} />
            </div>
            <div className="employee-details">
              Organization <br /> Faculty Details
            </div>
          </div>

          <hr className="header-devider mt-4"></hr>

          <div className="category-heading mt-4">Application Security</div>
          <hr className="header-devider mt-4"></hr>

          <div className="other-details-box">
            <div className="other-details-content">
              <div className="other-details">
                <div className="static-content">Number of departments</div>
                <div className="other-devider">:</div>
                <div className="other-value">4</div>
              </div>
              <div className="other-details">
                <div className="static-content">Number of specializations</div>
                <div className="other-devider">:</div>
                <div className="other-value">12</div>
              </div>
              <div className="other-details">
                <div className="static-content">Number of faculty</div>
                <div className="other-devider">:</div>
                <div className="other-value">24</div>
              </div>
            </div>
          </div>

          <div className="category-box mt-8">
            <hr className="header-devider mt-4"></hr>
            <div className="category-heading mt-4">Top Departments</div>{" "}
            <div className="categories">
              <div className="category">Engineering</div>
              <div className="category"> Commerce</div>
              <div className="category"> Arts</div>
            </div>
            {/* <hr className="header-devider mt-4"></hr> */}
          </div>

          <div className="category-box mt-8">
            <hr className="header-devider mt-4"></hr>
            <div className="category-heading mt-4">
              Top Specializations
            </div>{" "}
            <div className="categories">
              <div className="category">Finance</div>
              <div className="category"> CS</div>
              <div className="category"> Design</div>
            </div>
            {/* <hr className="header-devider mt-4"></hr> */}
          </div>
        </div>
      </div>
    </div>
  );
}
