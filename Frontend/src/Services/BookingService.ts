import axios from 'axios';
import { BookingModel } from '../Models/BookingModel';
import { bookingActions, instructorActions, store } from '../Redux/store';
import { appConfig } from '../Utils/AppConfig';
import { InstructorModel } from '../Models/InstructorModel';

class BookingService {
  public async getAllBookings(): Promise<BookingModel[]> {
    if (store.getState().bookings.length > 0) {
      return store.getState().bookings;
    }
    const response = await axios.get(appConfig.bookingsUrl);
    const data = response.data;
    const action = bookingActions.initBookings(data);
    store.dispatch(action);
    return data;
  }
  public async getAllInstructors(): Promise<InstructorModel[]> {
    if (store.getState().instructors.length > 0) {
      return store.getState().instructors;
    }
    const response = await axios.get(appConfig.instructorsUrl);
    const data = response.data;
    const action = instructorActions.initInstructors(data);
    store.dispatch(action);
    return data;
  }

  public async addBooking(booking: BookingModel): Promise<void[]> {
    const response = await axios.post(appConfig.bookingsUrl, booking);
    if (store.getState().bookings) {
      const action = bookingActions.addBooking(booking);
      store.dispatch(action);
    }
    return response.data;
  }

  public async deleteBooking(_id: string) {
    await axios.delete<BookingModel>(appConfig.bookingsUrl + _id);
    const action = bookingActions.deleteBooking(_id);
    store.dispatch(action);
  }

  public async editBooking(booking: BookingModel) {
    const response = await axios.put<BookingModel>(
      appConfig.bookingsUrl + booking._id
    );
    const updatedBooking = response.data;
    const action = bookingActions.editBooking(updatedBooking);
    store.dispatch(action);
  }
}

export const bookingService = new BookingService();
