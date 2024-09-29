import {
  ResourceNotFoundError,
  ValidationError,
} from '../3-models/client-errors';
import { ILikesModel, LikesModel } from '../3-models/likesModel';

class LikeService {
  public async getAllLikes() {
    return await LikesModel.find().exec();
  }

  public async addLike(like: ILikesModel) {
    // console.log('like-service from backend: adding like: ' + like);
    const error = like.validateSync();
    if (error) throw new ValidationError(error.message);
    return await like.save();
  }

  public async deleteLike(_id: string) {
    // console.log('1like-service from backend: deleting like with id: ' + _id);
    const deletedLike = await LikesModel.findByIdAndDelete(_id).exec();
    // console.log('2like-service from backend: deletedLike: ' + deletedLike);
    if (!deletedLike) throw new ResourceNotFoundError(_id);
  }
}

export const likeService = new LikeService();
