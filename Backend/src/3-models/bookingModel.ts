import mongoose, { Document, model, Schema } from 'mongoose';

export interface IBookingModel extends Document {
  serviceId: { type: mongoose.Schema.Types.ObjectId; ref: 'ServiceId' };
  instructorId: { type: mongoose.Schema.Types.ObjectId; ref: 'InstructorId' };
  userId: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
  selectedDate: Date;
  selectedTime: string;
}

export const BookingSchema = new Schema<IBookingModel>(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Missing service.'],
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      required: [true, 'Missing instructor id.'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing user id'],
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
