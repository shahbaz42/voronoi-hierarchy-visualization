import { JWT_SECRET } from '../config';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils';
import jwt from 'jsonwebtoken';

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new ApiError(401, 'Unauthorized'));
  }

  const [bearer, authToken] = token.split(' ');

  const decoded = jwt.verify(authToken, JWT_SECRET);
  if (!decoded) {
    return next(new ApiError(401, 'Unauthorized'));
  }
  next();
};
