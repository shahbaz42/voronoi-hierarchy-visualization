import { NextFunction, Request, Response } from 'express';
import { Employee, EmployeeRepository } from '../database';
import { ApiError } from '../utils';
import { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';

export class AdminController {
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

      return res.status(200).json({ 
        message: 'employee deleted',
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (username !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
        return next(new ApiError(401, 'Unauthorized'));
      }
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(200).json({
        message: 'Login successful',
        status: 200,
        success: true,
        data: {
          token: token,
          expires_in: '24h',
          user: {
            username: 'admin',
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
