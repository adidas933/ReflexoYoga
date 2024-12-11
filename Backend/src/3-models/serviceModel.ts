import { Document, model, Schema } from 'mongoose';

export interface IServiceModel extends Document {
  title: string,
  description: string,
  image: string,

}

export const ServiceSchema = new Schema<IServiceModel>(
  {
    title: {
      type: String,
      required: [true, 'Missing title.'],
      minlength: [2, 'Title too short.'],
      maxlength: [200, 'Title too long'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Missing description.'],
      minlength: [10, 'Description too short.'],
      maxlength: [2000, 'Description too long'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Missing image name'],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const ServiceModel = model<IServiceModel>(
  'Service',
  ServiceSchema,
  'services'
);
