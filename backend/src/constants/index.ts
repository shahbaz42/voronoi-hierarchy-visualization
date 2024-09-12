export interface IEmployee {
  name: string;
  email: string;
  profile: string;
  department: string;
  specialization: string;
}

export interface EmployeeDocument extends Document {
  id: string;
  name: string;
  email: string;
  profile: string;
  department: string;
  specialization: string;
}