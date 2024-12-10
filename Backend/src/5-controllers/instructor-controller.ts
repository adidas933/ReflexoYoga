import express, { NextFunction, Request, Response } from 'express';
import { instructorSerivce } from '../4-services/instructor-service';
import { StatusCode } from '../3-models/enums';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { appConfig } from '../2-utils/app-config';
import { InstructorModel } from '../3-models/instructorModel';

class InstructorController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/instructors', this.getAllInstructors);
    this.router.get(
      '/instructors/:_id([a-fA-F0-9]{24})',
      this.getInstructorById
    );
    this.router.post('/instructors', this.addInstructor);
    this.router.put('/instructors/:_id([a-fA-F0-9]{24})', this.editInstructor);
    this.router.delete(
      '/instructors/:_id([a-fA-F0-9]{24})',
      this.deleteInstructor
    );
  }

  private async getAllInstructors(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const instructors = await instructorSerivce.getAllInstructors();
      response.json(instructors);
    } catch (error: any) {
      next(error);
    }
  }

  private async getInstructorById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      const instructor = await instructorSerivce.getInstructorById(_id);
      response.json(instructor);
    } catch (error) {
      next(error);
    }
  }

  private async addInstructor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!request.files || !request.files.image) {
        return response
          .status(StatusCode.BadRequest)
          .json({ message: 'Image is required' });
      }
      const imageFile = request.files.image as UploadedFile;
      const imagePath = path.join(__dirname, '..', '1-assets', imageFile.name);
      imageFile.mv(imagePath, (err) => {
        if (err) {
          return next(err);
        }
      });
      const imageName = appConfig.baseImageUrl + imageFile.name.trim();
      const instructor = new InstructorModel({
        ...request.body,
        image: imageName,
      });
      const addedInstructor = await instructorSerivce.addInstructor(instructor);
      response.status(StatusCode.Created).json(addedInstructor);
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  private async editInstructor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      request.body._id = _id;
      const instructor = new InstructorModel(request.body);
      const updatedInstructor = await instructorSerivce.editInstructor(
        instructor
      );
      response.json({ success: true, data: updatedInstructor });
    } catch (error: any) {
      next(error);
    }
  }

  private async deleteInstructor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      await instructorSerivce.deleteInstructor(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error) {
      next(error);
    }
  }

  private async getInstructorImage(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const image = request.params.image;
      const imagePath = await instructorSerivce.getInstructorImage(image);
      response.sendFile(imagePath);
    } catch (error) {
      next(error);
    }
  }
}

const instructorController = new InstructorController();
export const instructorRouter = instructorController.router;
