import { InstructorModel } from "./InstructorModel";
import { ServiceModel } from "./ServiceModel";

export interface IBookingModel {
  _id?: string;
  serviceId: ServiceModel; // Reference to ServiceModel, not just string
  instructorId: InstructorModel; // Reference to InstructorModel, not just string
  selectedDate: string;
  selectedTime: string;
  userId: string; // Assuming it's a string
}

export class BookingModel implements IBookingModel {
  public _id?: string;
  public serviceId: ServiceModel;
  public instructorId: InstructorModel;
  public selectedDate: string;
  public selectedTime: string;
  public userId: string;

  constructor(data: IBookingModel) {
    this._id = data._id;
    this.serviceId = data.serviceId;
    this.instructorId = data.instructorId;
    this.selectedDate = data.selectedDate;
    this.selectedTime = data.selectedTime;
    this.userId = data.userId;
  }
}
