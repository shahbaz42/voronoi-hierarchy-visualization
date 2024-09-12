import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EmployeeRegistration() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    profile: "",
    department: "",
    specialization: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleValueChange = (value: string) => {
    setEmployee({
      ...employee,
      department: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let data = JSON.stringify(employee);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8001/employees",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      toast.success("Employee registered successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to register employee");
      console.log(error);
    }
  };

  return (
    <div className="registration-form-wrapper">
      <div className="registration-form-container">
        <h1 className="text-2xl font-bold text-center mb-6">
          Register Employee
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="profile">Profile URL</Label>
            <Input
              id="profile"
              name="profile"
              type="url"
              value={employee.profile}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              name="department"
              value={employee.department}
              onValueChange={handleValueChange}
              required
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Law">Law</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              name="specialization"
              type="text"
              value={employee.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Register Employee</Button>
        </form>
      </div>
    </div>
  );
}
