export class InstructorModel {
  public _id: string;
  public name: string;
  public bio: string;
  public image: string;
  public unavailableTimes: { start: Date; end: Date }[];
}
