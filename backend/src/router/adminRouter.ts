import express from 'express';
import { AdminController } from '../controllers';
import { validateRequest } from '../utils';
import { body } from 'express-validator';
import { AuthMiddleware } from '../middlewares';

const router = express.Router();
const adminController = new AdminController();

router.post(
  '/login',
  [
    body('username').isString().notEmpty().withMessage('username is required'),
    body('password').isString().notEmpty().withMessage('password is required'),
  ],
  validateRequest,
  adminController.adminLogin
);

router.post(
  '/employee',
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
  AuthMiddleware,
  adminController.createNewEmployee
);

router.delete(
  '/employee',
  [body('id').isString().notEmpty().withMessage('id is required')],
  validateRequest,
  AuthMiddleware,
  adminController.deleteEmployee
);

router.get('/employee', adminController.getAllEmployees);

export default router;
