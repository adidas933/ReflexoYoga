import { LikeModel } from "./LikeModel";

export class VacationModel {
  public _id: string;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: File | string
  public usersLikes?: LikeModel[]

}
