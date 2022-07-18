import Error from '../interfaces/error.interface';
import config from '../config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please login again');
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization');

    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decoded = jwt.verify(token, config.tokenSecret as unknown as string);
        if (decoded) {
          next();
        } else {
          handleUnauthorizedError(next);
        }
      } else {
        handleUnauthorizedError(next);
      }
    } else {
      handleUnauthorizedError(next);
    }
  } catch (err) {
    handleUnauthorizedError(next);
  }
};

export default validateTokenMiddleware;
