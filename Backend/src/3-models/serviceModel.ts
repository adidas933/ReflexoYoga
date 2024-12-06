import { Document, model, Schema } from 'mongoose';

export interface IServiceModel extends Document {
  title: string,
  description: string,
  image: string,
  link: string

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
      maxlength: [500, 'Description too long'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Missing image name'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Missing link url'],
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
