import { Request, Response } from 'express';
import { UserLoginRequest, UserRegisterRequest } from '../models/user.model';
import userService from '../services/user.service';

const register = async (req: Request, res: Response) => {
  try {
    const userRegisterRequest = req.body as UserRegisterRequest;

    const data = await userService.register(userRegisterRequest);

    res.json({
      status: 'success',
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const userLoginRequest = req.body as UserLoginRequest

    const data = await userService.login(userLoginRequest);

    res.json({
      status: 'success',
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }
};

const userController = {
  register,
  login,
};

export default userController;