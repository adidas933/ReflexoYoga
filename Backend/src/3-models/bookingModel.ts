import mongoose, { Document, model, Schema } from 'mongoose';

export interface IBookingModel extends Document {
  service: { type: mongoose.Schema.Types.ObjectId; ref: 'Service' };
  instructor: { type: mongoose.Schema.Types.ObjectId; ref: 'Instructor' };
  userId: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
  selectedDate: Date;
  selectedTime: string;
}

export const BookingSchema = new Schema<IBookingModel>(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Missing service.'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      required: [true, 'Missing bio.'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing available times'],
    },
    selectedDate: {
      type: Date,
      required: [true, 'Missing date'],
    },
    selectedTime: {
      type: String,
      required: [true, 'Missing time'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const BookingModel = model<IBookingModel>(
  'Booking',
  BookingSchema,
  'bookings'
);
