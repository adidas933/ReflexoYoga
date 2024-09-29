import express, { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../3-models/enums';
import { likeService } from '../4-services/like-service';
import { LikesModel } from '../3-models/likesModel';
import mongoose from 'mongoose';

class LikeController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get('/likes', this.getAllLikes);
    this.router.post('/likes', this.addLike);
    this.router.delete('/likes/:_likeId', this.deleteLike);
  }

  private async getAllLikes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const likes = await likeService.getAllLikes();
      response.json(likes);
    } catch (err: any) {
      next(err);
    }
  }
  private async addLike(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const { userId, vacationId } = request.body;

      // console.log('1like-controller: request.body: ' + request.body);

      const like = new LikesModel({
        userId: new mongoose.Types.ObjectId(userId),
        vacationId: new mongoose.Types.ObjectId(vacationId),
      });

      // console.log('2like-controller: addLike: like: ' + like);

      const addedLike = await likeService.addLike(like);

      // console.log('3like-controller: addLike: addedLike: ' + addedLike);

      response.status(StatusCode.Created).json(addedLike);
    } catch (err: any) {
      if (err.code === 11000) {
        // handle duplicate key error
        response
          .status(StatusCode.Conflict)
          .json('Duplicate like' );
      } else {
        next(err);
      }
    }
  }

  private async deleteLike(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const _id = request.params._likeId;

      // console.log('1like-controller: deleteLike: _id: ' + _id);

      const deletedLike = await likeService.deleteLike(_id);

      // console.log('2like-controller: deleteLike: deletedLike: ' + deletedLike);

      response.sendStatus(StatusCode.NoContent);

    } catch (err: any) {
      next(err);
    }
  }
}

const likeController = new LikeController();
export const likeRouter = likeController.router;
