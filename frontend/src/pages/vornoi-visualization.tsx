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
        type: "specialization",
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
    specializationGroup.groups.push({
      label: item.name,
      type: "faculty",
      data: item,
      weight: 0,
    });
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
    const response = await axios.get(`${apiUrl}/admin/employee`);
    return response.data.employees;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw error to be handled by the caller
  }
}

export default function VoronoiVisualization() {
  const [flatData, setFlatData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [departments, setDepartments] = useState(0);
  const [specializations, setSpecializations] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedDepartmentData, setSelectedDepartmentData] = useState<{
    label: string;
    weight: number;
    groups: any[];
  } | null>(null);

  const [topSpecializationsOfDept, setTopSpecializationsOfDept] = useState<
    any[]
  >([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >(null);
  const [selectedSpecializationData, setSelectedSpecializationData] = useState<{
    label: string;
    weight: number;
    groups: any[];
  } | null>(null);
  const [topFacultyOfSpecialization, setTopFacultyOfSpecialization] = useState<
    any[]
  >([]);

  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedFacultyData, setSelectedFacultyData] = useState<{
    _id: string;
    name: string;
    email: string;
    department: string;
    specialization: string;
    profile: string;
  } | null>(null);

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
    const nestDat = nestData(flatData);

    setDepartments(nestDat.groups.length);

    const numberOfSpecializations = nestDat.groups.reduce((acc, department) => {
      return acc + department.weight;
    }, 0);

    setSpecializations(numberOfSpecializations);

    const foamtree = new FoamTree({
      id: "foamtree", // The ID of the container element where the chart will render
      dataObject: nestDat, // The nested data object
      onGroupClick: (event: any) => {
        setSelectedGroup(event.group.label);

        // if department is selected
        if (
          [
            "Engineering",
            "Law",
            "Medical",
            "Social Sciences",
            "Civil",
            "Commerce",
            "CS",
            "Architecture",
            "Electrical",
          ].includes(event.group.label)
        ) {
          setSelectedDepartment(event.group.label);
          setSelectedDepartmentData(event.group);

          // calculate top specializations
          const specializationsSorted = event.group.groups.sort(
            (a: any, b: any) => b.weight - a.weight
          );
          setTopSpecializationsOfDept(specializationsSorted.slice(0, 4));

          setSelectedSpecialization(null);
          setSelectedFaculty(null);

        } else if (event.group?.type === "specialization") {
          setSelectedSpecialization(event.group.label);
          setSelectedSpecializationData(event.group);

          // calculate top faculty
          const facultySorted = event.group.groups.sort(
            (a: any, b: any) => b.weight - a.weight
          );

          setTopFacultyOfSpecialization(facultySorted.slice(0, 4));

          setSelectedDepartment(null);
          setSelectedFaculty(null);

        } else if (event.group?.type === "faculty") {
          
          setSelectedFaculty(event.group.label);
          setSelectedFacultyData(event.group.data);
          setSelectedSpecialization(null);
          setSelectedDepartment(null);
        }
      },
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

          <div className="static-header-container org-logo">
            <div className="image-box">
              <img className="employee-img" src={logo} />
            </div>
            <div className="employee-details">
              Organization <br /> Details
            </div>
          </div>

          <hr className="header-devider mt-4"></hr>

          {selectedGroup && (
            <div>
              <div className="category-heading mt-4">{selectedGroup}</div>
              <hr className="header-devider mt-4"></hr>
            </div>
          )}

          {!selectedGroup && (
            // if no group is selected
            <div>
              <div className="other-details-box">
                <div className="other-details-content">
                  <div className="other-details">
                    <div className="static-content">Number of departments</div>
                    <div className="other-devider">:</div>
                    <div className="other-value">{departments}</div>
                  </div>
                  <div className="other-details">
                    <div className="static-content">
                      Number of specializations
                    </div>
                    <div className="other-devider">:</div>
                    <div className="other-value">{specializations}</div>
                  </div>
                  <div className="other-details">
                    <div className="static-content">Number of faculty</div>
                    <div className="other-devider">:</div>
                    <div className="other-value">{flatData.length}</div>
                  </div>
                </div>
              </div>
              {/* Top Departments when nothing is selected */}
              <div className="category-box mt-8">
                <hr className="header-devider mt-4"></hr>
                <div className="category-heading mt-4">
                  Top Departments
                </div>{" "}
                <div className="categories">
                  <div className="category">Engineering</div>
                  <div className="category"> Law</div>
                  <div className="category"> Medical</div>
                </div>
                {/* <hr className="header-devider mt-4"></hr> */}
              </div>
              {/* Top specializations when nothing is selected */}
              <div className="category-box mt-8">
                <hr className="header-devider mt-4"></hr>
                <div className="category-heading mt-4">
                  Top Specializations
                </div>{" "}
                {/* to do : calculate it programatically */}
                <div className="categories">
                  <div className="category">Software Engineering</div>
                  <div className="category"> Data Science</div>
                  <div className="category"> Finance</div>
                </div>
                {/* <hr className="header-devider mt-4"></hr> */}
              </div>
            </div>
          )}

          {selectedDepartment &&
            !selectedSpecialization &&
            !selectedFaculty && (
              <div>
                <div className="other-details-box">
                  <div className="other-details-content">
                    <div className="other-details">
                      <div className="static-content">
                        Number of Specializations
                      </div>
                      <div className="other-devider">:</div>
                      <div className="other-value">
                        {selectedDepartmentData?.weight}
                      </div>
                    </div>
                    <div className="other-details">
                      <div className="static-content">Number of faculty</div>
                      <div className="other-devider">:</div>
                      <div className="other-value">
                        {selectedDepartmentData?.groups.reduce(
                          (acc: number, specialization: any) => {
                            return acc + specialization.weight;
                          },
                          0
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Top Specializations when a department is selected */}
                <div className="category-box mt-8">
                  <hr className="header-devider mt-4"></hr>
                  <div className="category-heading mt-4">
                    Top Specializations of {selectedDepartment}
                  </div>{" "}
                  {/* to do : calculate it programatically */}
                  <div className="categories">
                    {topSpecializationsOfDept.map((specialization) => (
                      <div className="category">{specialization.label}</div>
                    ))}
                  </div>
                  {/* <hr className="header-devider mt-4"></hr> */}
                </div>
              </div>
            )}

          {selectedSpecialization && !selectedFaculty && (
            <div>
              <div className="other-details-box">
                <div className="other-details-content">
                  <div className="other-details">
                    <div className="static-content">
                      Number of Faculty of {selectedSpecialization}
                    </div>
                    <div className="other-devider">:</div>
                    <div className="other-value">
                      {selectedSpecializationData?.weight}
                    </div>
                  </div>
                </div>
              </div>
              {/* Top Faculy when a specialization is selected */}
              <div className="category-box mt-8">
                <hr className="header-devider mt-4"></hr>
                <div className="category-heading mt-4">
                  Top Faculties of {selectedSpecialization}
                </div>{" "}
                {/* to do : calculate it programatically */}
                <div className="categories">
                  {topFacultyOfSpecialization.map((faculty) => (
                    <div className="category">{faculty.label}</div>
                  ))}
                </div>
                {/* <hr className="header-devider mt-4"></hr> */}
              </div>
            </div>
          )}

          {selectedFaculty && (
            <div>
              <div className="other-details-box">
                <div className="other-details-content">
                  <div className="other-details">
                    <div className="static-content">
                      Email:
                    </div>
                    <div className="other-devider">:</div>
                    <div className="other-value">
                      <a href=""> { selectedFacultyData?.email } </a>
                    </div>
                  </div>
                  <div className="other-details">
                    <div className="static-content">
                      Profile:
                    </div>
                    <div className="other-devider">:</div>
                    <div className="other-value">
                      <a href=""> { selectedFacultyData?.profile } </a>
                    </div>
                  </div>
                  <div className="other-details">
                    <div className="static-content">
                      Department:
                    </div>
                    <div className="other-devider">:</div>
                    <div className="other-value">
                      <a href=""> { selectedFacultyData?.department } </a>
                    </div>
                  </div>
                  <div className="other-details">
                    <div className="static-content">
                      Specialization:
                    </div>
                    <div className="other-devider">:</div>
                    <div className="other-value">
                      <a href=""> { selectedFacultyData?.specialization } </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* to do : calculate it programatically */}

          {/* <a href="/admin" className="btn btn-primary mt-8 fixed-bottom">Admin Panel</a> */}
        </div>
      </div>
    </div>
  );
}
