import express, { Request, Response, NextFunction } from 'express';
import { userService } from '../4-services/user-service';
import { StatusCode } from '../3-models/enums';
import { CredentialsModel } from '../3-models/credentials-model';
import { UserModel } from '../3-models/userModel';
import { ConflictError } from '../3-models/client-errors';

class UserController {
  public readonly router = express.Router();

  public constructor() {
    this.router.post('/register',  this.register);
    this.router.post('/login', this.login);
    this.router.post('/check-email', this.checkEmail)
  }

  private async register(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {

      const user = new UserModel(request.body);

      const token = await userService.register(user);

      response.status(StatusCode.Created).json(token);

    } catch (err: any) {
      if (err instanceof ConflictError) {
        response.status(StatusCode.Conflict).send(err.message)
      } else {
        next(err);
      }
    }
  }

  private async login(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await userService.login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
  private async checkEmail(request: Request, response: Response, next: NextFunction) {
    try {
      const { email } = request.body;
      const user = await UserModel.findOne({ email }).exec();
      if (user) {
        response.status(200).json(true); // Email already registered
      } else {
        response.status(200).json(false); // Email is available
      }
    } catch (err: any) {
      next(err);
    }
  }
}

export const userController = new UserController();
export const userRouter = userController.router;