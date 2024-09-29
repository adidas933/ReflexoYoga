import { Role } from './enums';
import { Document, model, Schema } from 'mongoose';

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: Role;
}

export const UserSchema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, 'Missing first name.'],
      minlength: [2, 'First name too short.'],
      maxlength: [200, 'First name too long.'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Missing last name.'],
      minlength: [2, 'Last name too short.'],
      maxlength: [200, 'Last Name too long.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Missing email.'],
      minlength: [5, 'Email too short.'],
      maxlength: [200, 'Email too long.'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Missing password.'],
      minlength: [5, 'Password too short.'],
      maxlength: [200, 'Password too long.'],
      trim: true,
    },  
    roleId: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model<IUserModel>('UserModel', UserSchema, 'users');
