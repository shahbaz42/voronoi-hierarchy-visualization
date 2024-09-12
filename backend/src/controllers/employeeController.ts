import { NextFunction, Request, Response } from 'express';
import { Employee, EmployeeRepository } from '../database';
import { ApiError } from '../utils';

export class EmployeeController {
  async createNewEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, profile, department, specialization } = req.body;

      const employeeRepository = new EmployeeRepository(Employee);

      const employee = await employeeRepository.createEmployee({
        name,
        email,
        profile,
        department,
        specialization,
      });

      if (!employee) {
        return next(new ApiError(500, 'Failed to create employee'));
      }

      return res.status(201).json({ message: 'employee created', employee });
    } catch (error) {
      next(error);
    }
  }

  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeRepository = new EmployeeRepository(Employee);

      const employees = await employeeRepository.getAllEmployees();

      return res.status(200).json({ employees });
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;

      const employeeRepository = new EmployeeRepository(Employee);

      const employee = await employeeRepository.deleteEmployee(id);

      return res.status(200).json({ message: 'employee deleted' });
    } catch (error) {
      next(error);
    }
  }
}
