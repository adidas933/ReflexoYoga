import { BookingModel, IBookingModel } from '../3-models/bookingModel';
import {
  ConflictError,
  ResourceNotFoundError,
  ValidationError,
} from '../3-models/client-errors';
import { InstructorModel } from '../3-models/instructorModel';
import { ServiceModel } from '../3-models/serviceModel';

class BookingService {
  // Retrieve all bookings from the database
  public async getAllBookings() {
    const bookings = await BookingModel.find()
      .populate('service')
      .populate('instructor')
      .populate('userId')
      .exec();
    return bookings;
  }

  // Add a new booking
  public async addBooking(booking: IBookingModel) {
    // Validate booking object
    const error = booking.validateSync();
    if (error) throw new ValidationError(error.message);
    // Check if service exists
    const serviceExists = await ServiceModel.findById(booking.service).exec();
    if (!serviceExists) throw new ResourceNotFoundError('Service not found.');
    // Check if instructor exists
    const instructor = await InstructorModel.findById(
      booking.instructor
    ).exec();
    if (!instructor) throw new ResourceNotFoundError('Instructor not found.');
    // Check instructor availablity
    const isAvailable = instructor.availableTimes.includes(
      booking.selectedTime
    );
    if (!isAvailable)
      throw new ConflictError(
        'Instructor is not available at the selected time.'
      );
    // Check for conflicting booking
    const conflictingBooking = await BookingModel.findOne({
      instructor: booking.instructor,
      selectedDate: booking.selectedDate,
      selectedTime: booking.selectedTime,
    }).exec();
    if (conflictingBooking)
      throw new ConflictError('This time slot is already booked.');
    // Save booking
    const savedBooking = await booking.save();
    return savedBooking;
  }

  // Edit an existing booking
  public async editBooking(booking: IBookingModel) {
    // Validate booking object
    const error = booking.validateSync();
    if (error) throw new ValidationError(error.message);
    // Update the booking
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      booking._id,
      booking,
      {
        returnOriginal: false, // Returns the updated booking
      }
    ).exec();
    if (!updatedBooking)
      throw new ResourceNotFoundError(booking._id.toString());
    return updatedBooking;
  }

  // Delete a booking
  public async deleteBooking(_id) {
    const deletedBooking = await BookingModel.findByIdAndDelete(_id).exec();
    if (!deletedBooking) throw new ResourceNotFoundError(_id);
    return deletedBooking;
  }

  // Get a specific booking by ID
  public async getBookingById(_id: string) {
    const booking = await BookingModel.findById(_id)
      .populate('service')
      .populate('instructor')
      .populate('userId')
      .exec();
    if (!booking) throw new ResourceNotFoundError(_id);
    return booking;
  }
}

export const bookingService = new BookingService();
