import { Request, Response } from 'express';
import { UserRegisterRequest } from '../models/user.model';
import userService from '../services/user.service';

const register = async (req: Request, res: Response) => {
  try {
    const userRegisterRequest = req.body as UserRegisterRequest;

    const data = userService.register(userRegisterRequest);

    res.json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const userRegisterRequest = req.body as UserRegisterRequest;

    const data = userService.login(userRegisterRequest);

    res.json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const userController = {
  register,
  login,
};

export default userController;