export class InstructorModel {
  public _id: string;
  public name: string;
  public bio: string;
  public unavailableTimes: { start: Date; end: Date }[];
}
