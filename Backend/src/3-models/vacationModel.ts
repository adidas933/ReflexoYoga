import  { Document, model, Schema } from 'mongoose';
import { LikesModel } from './likesModel';

export interface IVacationModel extends Document {
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string

}

export const VacationSchema = new Schema<IVacationModel>(
  {
    destination: {
      type: String,
      required: [true, 'Missing destination.'],
      minlength: [2, 'Destination too short.'],
      maxlength: [200, 'Destination too long.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Missing description.'],
      minlength: [2, 'Description too short.'],
      maxlength: [2000, 'Description too long.'],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Missing start date.'],
    },
    endDate: {
      type: Date,
      required: [true, 'Missing end date.'],
    },
    price: {
      type: Number,
      required: [true, 'Missing price.'],
      min: [1, 'Price too low.'],
      max: [99999, 'Price too high.'],
    },
    image: {
      type: String,
      required: [true, 'Missing image.'],
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true }, // Include virtual fields in JSON output.
    toObject: { virtuals: true }, // Include virtual fields in object output.
    id: false, // Don't duplicate _id to id.
  }
);

VacationSchema.virtual('usersLikes', {
  ref: LikesModel, // Reference to LikesModel
  localField: '_id', // Local field in VacationModel
  foreignField: 'vacationId', // Field in LikesModel
  justOne: false, // Retrieve an array of likes
});

export const VacationModel = model<IVacationModel>(
  'VacationModel',
  VacationSchema,
  'vacations'
);