import { Document, model, Schema } from 'mongoose';

export interface IInstructorModel extends Document {
  name: string;
  bio: string;
  availableTimes: string[];
}

export const InstructorSchema = new Schema<IInstructorModel>(
  {
    name: {
      type: String,
      required: [true, 'Missing name.'],
      minlength: [2, 'Name too short.'],
      maxlength: [200, 'Name too long'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Missing bio.'],
      minlength: [10, 'Bio too short.'],
      maxlength: [500, 'Bio too long'],
      trim: true,
    },
    availableTimes: {
      type: [String],
      required: [true, 'Missing available times'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const InstructorModel = model<IInstructorModel>(
  'Instructor',
  InstructorSchema,
  'instructors'
);
