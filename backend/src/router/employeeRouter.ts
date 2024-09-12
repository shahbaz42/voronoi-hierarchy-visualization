import express from 'express';
import { EmployeeController } from '../controllers';
import { validateRequest } from '../utils';
import { body } from 'express-validator';

const router = express.Router();
const employeeController = new EmployeeController();

router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('email').isEmail().notEmpty().withMessage('email is required'),
    body('profile').isString().notEmpty().withMessage('profile is required'),
    body('department')
      .isString()
      .notEmpty()
      .withMessage('department is required'),
    body('specialization')
      .isString()
      .notEmpty()
      .withMessage('specialization is required'),
  ],
  validateRequest,
  employeeController.createNewEmployee
);

router.delete(
  '/',
  [body('id').isString().notEmpty().withMessage('id is required')],
  validateRequest,
  employeeController.deleteEmployee
);

router.get('/', employeeController.getAllEmployees);

export default router;
