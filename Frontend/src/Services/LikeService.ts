import axios from 'axios';
import { appConfig } from '../Utils/AppConfig';
import { LikeModel } from '../Models/LikeModel';

class LikeService {
  public async getAllLikes() {
    const response = await axios.get<LikeModel[]>(appConfig.likesUrl);
    const likes = response.data
    console.log(likes);
    return likes;
  }

  public async addLike(like: LikeModel) {
    try {
      const response = await axios.post<LikeModel>(appConfig.likesUrl, like);
      return response.data;
    } catch (error) {
      console.log('Error liking vacation: ', error);
      throw error;
    }
  }

  public async deleteLike(_id: string) {
    try {
      // Ensure there's a slash before the ID for the correct URL
      await axios.delete(`${appConfig.likesUrl}${_id}`);
    } catch (error: any) {
      console.log('Error unliking vacation: ', error.message);
      throw error;
    }
  }
}

export const likeService = new LikeService();
