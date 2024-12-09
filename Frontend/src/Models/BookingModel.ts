export class BookingModel {
  public _id?: string;
  public serviceId: string;
  public instructorId: string;
  public userId?: string;
  public selectedDate: string;
  public selectedTime: string;
}
