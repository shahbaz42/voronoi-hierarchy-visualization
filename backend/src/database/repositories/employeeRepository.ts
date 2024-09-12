import { Employee } from '../models';
import {
  EmployeeDocument,
  IEmployee,
} from '../../constants';

export class EmployeeRepository {
  constructor(private employeeModel: typeof Employee) {}

  /**
   * Creates a new employee in the database.
   *
   * @param data - The data for the employee.
   * @returns A promise that resolves to the created employee document.
   */
  async createEmployee(data: IEmployee): Promise<EmployeeDocument> {
    return this.employeeModel.create(data);
  }

  /**
   * Retrieves all employees from the database.
   *
   * @returns A promise that resolves to an array of employee documents.
   */
  async getAllEmployees(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find().exec();
  }


  /**
   * Deletes an employee from the database.
   *
   * @param id - The id of the employee to delete.
   * @returns A promise that resolves to the deleted employee document.
   */
  async deleteEmployee(id: string): Promise<EmployeeDocument | null> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
