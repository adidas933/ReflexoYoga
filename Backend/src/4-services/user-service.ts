import { Role } from '../3-models/enums';
import { CredentialsModel } from '../3-models/credentials-model';
import { IUserModel, UserModel } from '../3-models/userModel';
import { ConflictError, UnauthorizedError } from '../3-models/client-errors';
import { cyber } from '../2-utils/cyber';

class UserService {
  public async register(user: IUserModel) {

    const existingUser = await UserModel.findOne({email: user.email}).exec()
    if (existingUser) {
      throw new ConflictError("Email already registered.")
    }

    
    // Hash password:
    user.password = cyber.hash(user.password);
    user.roleId = Role.User;

    const saveUser = await new UserModel(user).save();

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(saveUser);

    // Return:
    return token;
  }

  public async login(credentials: CredentialsModel) {

    // Hash password:
    credentials.password = cyber.hash(credentials.password);

    const user = await UserModel.findOne({
      email: credentials.email,
      password: credentials.password,
    }).exec();

    // If no user:
    if (!user) {
      console.log('User not found or incorrect password.');
      throw new UnauthorizedError('Incorrect email or password.');
    }

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }
}

export const userService = new UserService();
