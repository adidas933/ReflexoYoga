import express, { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../3-models/enums';
import { vacationService } from '../4-services/vacation-service';
import { VacationModel } from '../3-models/vacationModel';
import  { UploadedFile } from 'express-fileupload';
import path from 'path';
import { fileSaver } from 'uploaded-file-saver';
import { appConfig } from '../2-utils/app-config';



class VacationController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/vacations', this.getAllVacations);
    this.router.get(
      '/vacation-by-userId/:_id([a-fA-F0-9]{24})',
      this.getVacation
    );
    this.router.post('/vacations', this.addVacation);
    this.router.put('/vacations/:_id([a-fA-F0-9]{24})', this.editVacation);
    this.router.delete('/vacations/:_id([a-fA-F0-9]{24})', this.deleteVacation);
    this.router.get('/vacations/images/:image', this.getVacationImage);

  }

  private async getAllVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const page = parseInt(request.query.page as string) || 1;
      const limit = parseInt(request.query.limit as string) || 9;

      const { vacations, totalCount, totalPages, currentPage } = await vacationService.getAllVacations(page, limit);
      response.json({
        success: true,
        data: vacations,
        totalCount, // Now returning totalCount
        totalPages,
        currentPage,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private async getVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      const data = await vacationService.getVacation(_id);
      response.json(data);
    } catch (err: any) {
      next(err);
    }
  }

  private async editVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      request.body._id = _id;
      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationService.editVacation(vacation);
      response.json({ success: true, data: updatedVacation });
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      await vacationService.deleteVacation(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }


  private async addVacation(
    request: Request,
    response: Response,
    next: NextFunction
) {
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
        const imageName =
            appConfig.baseImageUrl + imageFile.name.trim();
        const vacation = new VacationModel({
            ...request.body,
            image: imageName,
        });
        const addedVacation = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    } catch (err: any) {
        console.log(err);
        next(err);
    }
}


  private async getVacationImage(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const image = request.params.image;
        const imagePath = await vacationService.getVacationImage(image);
        response.sendFile(imagePath);
    } catch (err: any) {
        next(err);
    }
}
}


const vacationController = new VacationController();
export const vacationRouter = vacationController.router;
