import path from 'path';
import {
  ResourceNotFoundError,
  ValidationError,
} from '../3-models/client-errors';
import { IServiceModel, ServiceModel } from '../3-models/serviceModel';
import fs from 'fs';
import { fileSaver } from 'uploaded-file-saver';

class ServiceService {
  public async getAllServices() {
    const services = await ServiceModel.find().exec();
    return services;
  }


  public async addService(service: IServiceModel) {
    const error = service.validateSync();
    if (error) throw new ValidationError(error.message);
    return await service.save();
  }

  public async editService(service: IServiceModel) {
    const error = service.validateSync();
    if (error) throw new ValidationError(error.message);
    const updatedService = await ServiceModel.findByIdAndUpdate(
      service._id,
      service,
      { returnOriginal: false }
    ).exec();
    if (!updatedService)
      throw new ResourceNotFoundError(service._id.toString());
    return updatedService;
  }

  public async deleteService(_id: string) {
    const deletedService = await ServiceModel.findByIdAndDelete(_id).exec();
    if (!deletedService) throw new ResourceNotFoundError(_id);
    const imagePath = path.join(
      __dirname,
      '1-assets',
      'images',
      deletedService.image
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  public async getServiceImage(image: string): Promise<string> {
    const imagePath = path.join(__dirname, '..', '1-assets', image);
    console.log('imagePath: ' + imagePath);
    fileSaver.config(imagePath);
    return imagePath;
  }
}

export const serviceService = new ServiceService();
