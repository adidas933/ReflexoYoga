import { Document, model, ObjectId, Schema, Types } from 'mongoose';

export interface ILikesModel extends Document {
  userId: Types.ObjectId;
  vacationId: Types.ObjectId;
}

export const LikesSchema = new Schema<ILikesModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    vacationId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const LikesModel = model<ILikesModel>(
  'LikesModel',
  LikesSchema,
  'likes'
);
