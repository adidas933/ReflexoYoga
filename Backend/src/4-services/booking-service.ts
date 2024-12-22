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
      .populate('serviceId')
      .populate('instructorId')
      .populate('userId')
      .exec();
    return bookings;
  }

  public async getUserBookings(userId: string) {
    console.log('Querying bookings for userId:', userId);

    const bookings = await BookingModel.find({ userId })
    .populate('serviceId', 'title')   // Populate service with only the 'name' field
    .populate('instructorId', 'name')  // Populate instructor with 'firstName' and 'lastName'
    .populate('userId')
      .exec();
    console.log('Found bookings:', bookings);
    return bookings;
  }

  // Add a new booking
  public async addBooking(booking: IBookingModel) {
    // Validate booking object
    const error = booking.validateSync();
    if (error) throw new ValidationError(error.message);
    // Check if service exists
    const serviceExists = await ServiceModel.findById(booking.serviceId).exec();
    if (!serviceExists) throw new ResourceNotFoundError('Service not found.');
    // Check if instructor exists
    const instructorId = await InstructorModel.findById(
      booking.instructorId
    ).exec();
    console.log('Instructor id: ' + instructorId);
    if (!instructorId) throw new ResourceNotFoundError('Instructor not found.');
    if (
      !instructorId.unavailableTimes ||
      !Array.isArray(instructorId.unavailableTimes)
    )
      throw new ResourceNotFoundError(
        'Instructor availability data is missing or invalid.'
      );
    // Check instructor availablity
    const isUnavailable = instructorId.unavailableTimes.includes(
      booking.selectedTime
    );
    if (isUnavailable)
      throw new ConflictError(
        'Instructor is not available at the selected time.'
      );
    // Check for conflicting booking
    const conflictingBooking = await BookingModel.findOne({
      instructorId: booking.instructorId,
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
}

export const bookingService = new BookingService();
