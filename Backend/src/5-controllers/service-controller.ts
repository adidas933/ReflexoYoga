import express, { NextFunction, Request, Response } from 'express';
import { serviceService } from '../4-services/service-service';
import { ServiceModel } from '../3-models/serviceModel';
import { StatusCode } from '../3-models/enums';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { appConfig } from '../2-utils/app-config';

class ServiceController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/services', this.getAllServices);
    this.router.get('/services/:_id([a-fA-F0-9]{24})', this.getServiceById);
    this.router.post('/services', this.addService);
    this.router.put('/services/:_id([a-fA-F0-9]{24})', this.editService);
    this.router.delete('/services/:_id([a-fA-F0-9]{24})', this.deleteService);
    this.router.get('/services/images/:image',this.getServiceImage)
  }
  private async getAllServices(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const services = await serviceService.getAllServices();
      response.json(services);
    } catch (error: any) {
      next(error);
    }
  }

  private async getServiceById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      const service = await serviceService.getServiceById(_id);
      response.json(service);
    } catch (error) {
      next(error);
    }
  }

  private async addService(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!request.files || !request.files.image) {
        return response.status(StatusCode.BadRequest).json({message:'Image is required'})
      }
      const imageFile = request.files.image as UploadedFile
      const imagePath = path.join(__dirname, '..','1-assets',imageFile.name)
      imageFile.mv(imagePath,(err) => {
        if (err) {
          return next(err)
        }
      })
      const imageName = appConfig.baseImageUrl + imageFile.name.trim()
      const service = new ServiceModel({...request.body,image:imageName})
      const addedService = await serviceService.addService(service)

      response.status(StatusCode.Created).json(addedService);

/* 
      const { title, description, image, link } = request.body;
      if (!title || !description || !image || !link) {
        throw new ValidationError('Missing required fields.');
      }  */
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  private async editService(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      request.body._id = _id;
      const service = new ServiceModel(request.body);
      const updatedService = await serviceService.editService(service);
      response.json({ success: true, data: updatedService });
    } catch (error: any) {
      next(error);
    }
  }

  private async deleteService(
    request: Request,
    response: Response, 
    next: NextFunction
  ): Promise<any> {
    try {
      const _id = request.params._id;
      await serviceService.deleteService(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error: any) {
      next(error);
    }
  }

  private async getServiceImage(request:Request,response:Response,next:NextFunction) {
    try {
      const image = request.params.image
      const imagePath = await serviceService.getServiceImage(image)
      response.sendFile(imagePath)
    } catch (error:any) {
      next(error)
    }
  }
}
const serviceController = new ServiceController()
export const serviceRouter = serviceController.router
