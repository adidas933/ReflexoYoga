import express, { NextFunction, Request, Response } from 'express';
import { bookingService } from '../4-services/booking-service';
import { StatusCode } from '../3-models/enums';
import { BookingModel } from '../3-models/bookingModel';
import { ValidationError } from '../3-models/client-errors';

class BookingController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/bookings', this.getAllBookings, );
    this.router.post('/bookings', this.addBooking);
    this.router.put('/bookings/:_id([a-fA-F0-9]{24})', this.editBooking);
    this.router.delete('/bookings/:_id([a-fA-F0-9]{24})', this.deleteBooking);
  }

  private async getAllBookings(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const bookings = await bookingService.getAllBookings();
      response.json(bookings);
    } catch (error: any) {
      next(error);
    }
  }




  private async addBooking(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { serviceId, instructorId, userId, selectedDate, selectedTime } = request.body;
      if (!serviceId || !instructorId || !userId || !selectedDate || !selectedTime) {
        throw new ValidationError('Missing required fields.');
      }
  
      const booking = new BookingModel(request.body);
      const addedBooking = await bookingService.addBooking(booking);
      response.status(StatusCode.Created).json(addedBooking);
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }



  private async editBooking(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      request.body._id = _id;
      const booking = new BookingModel(request.body);
      const updatedBooking = await bookingService.editBooking(booking);
      response.json({ success: true, data: updatedBooking });
    } catch (error: any) {
      next(error);
    }
  }
  
  private async deleteBooking(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      await bookingService.deleteBooking(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error: any) {
      next(error);
    }
  }
}
const bookingController = new BookingController()
export const bookingRouter = bookingController.router

