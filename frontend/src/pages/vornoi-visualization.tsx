import { useEffect } from "react";
// @ts-ignore
import FoamTree from "@carrotsearch/foamtree";
import { Employee } from "@/components/employees/columns";
import logo from "../assets/logo.jpg";

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

export default function VoronoiVisualization() {
  useEffect(() => {
    const flatData = [
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Madhavan",
        specialization: "CS",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Ravi",
        specialization: "CS",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Venketesh",
        specialization: "Civil",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Shahbaz",
        specialization: "Civil",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Manish",
        specialization: "Civil",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Avni",
        specialization: "Mechanical",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Priya",
        specialization: "Mechanical",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Solid Mechanics",
        specialization: "Mechanical",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Power Systems",
        specialization: "Electrical",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Electronics",
        specialization: "Electrical",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Control Systems",
        specialization: "Electrical",
        department: "Engineering",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Painting",
        specialization: "Fine Arts",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Sculpture",
        specialization: "Fine Arts",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Graphic Design",
        specialization: "Design",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Animation",
        specialization: "Design",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Textile Design",
        specialization: "Design",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Music",
        specialization: "Performing Arts",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Dance",
        specialization: "Performing Arts",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Drama",
        specialization: "Performing Arts",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Art History",
        specialization: "Theory",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Art Criticism",
        specialization: "Theory",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Art Appreciation",
        specialization: "Theory",
        department: "Arts",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Anatomy",
        specialization: "Basic Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Physiology",
        specialization: "Basic Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Biochemistry",
        specialization: "Basic Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Pathology",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Pharmacology",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Microbiology",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Surgery",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Medicine",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Obstetrics and Gynecology",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Pediatrics",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Radiology",
        specialization: "Clinical Sciences",
        department: "Medical",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Accounting",
        specialization: "Finance",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Economics",
        specialization: "Finance",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Marketing",
        specialization: "Marketing",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Human Resource Management",
        specialization: "Human Resource",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Business Law",
        specialization: "Law",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Business Statistics",
        specialization: "Statistics",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Management",
        specialization: "General Management",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Entrepreneurship",
        specialization: "General Management",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "International Business",
        specialization: "International Business",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "E-commerce",
        specialization: "Technology",
        department: "Commerce",
      },
      {
        id: "1",
        email: "abc@gmail.com",
        profile: "https://www.linkedin.com/in/shahbaz42",
        name: "Retail Management",
        specialization: "Retail",
        department: "Commerce",
      },
    ] as Employee[];

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
  }, []);

  return (
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
          <div className="category-heading mt-4">Top Specializations</div>{" "}
          <div className="categories">
            <div className="category">Finance</div>
            <div className="category"> CS</div>
            <div className="category"> Design</div>
          </div>
          {/* <hr className="header-devider mt-4"></hr> */}
        </div>
      </div>
    </div>
  );
}
