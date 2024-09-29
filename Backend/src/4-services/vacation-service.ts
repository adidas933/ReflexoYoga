import {
  ResourceNotFoundError,
  ValidationError,
} from '../3-models/client-errors';
import { IVacationModel, VacationModel } from '../3-models/vacationModel';
import path from 'path';
import fs from 'fs';
import { fileSaver } from 'uploaded-file-saver';

class VacationService {
  public async getAllVacations(page: number = 1, limit: number = 9) {
    const vacations = await VacationModel.find()
      .populate('usersLikes')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  
    const totalCount = await VacationModel.countDocuments().exec();
  
    return {
      vacations,
      totalCount, // Return total count of all vacations
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  public async getVacation(_id: string) {
    const vacation = await VacationModel.findById(_id).exec();
    if (!vacation) throw new ResourceNotFoundError(_id);
    return vacation; // Ensure to return the found vacation
  }

  public async addVacation(vacation: IVacationModel) {
    const error = vacation.validateSync();
    if (error) throw new ValidationError(error.message);
    return await vacation.save();
  }

  public async editVacation(vacation: IVacationModel) {
    const error = vacation.validateSync();
    if (error) throw new ValidationError(error.message);

    const updatedVacation = await VacationModel.findByIdAndUpdate(
      vacation._id,
      vacation,
      {
        returnOriginal: false, //  returnOriginal: false - returns the updated vacation and not the original one.
      }
    ).exec();
    if (!updatedVacation)
      throw new ResourceNotFoundError(vacation._id.toString());
    return updatedVacation;
  }

  public async deleteVacation(_id: string) {
    const deletedVacation = await VacationModel.findByIdAndDelete(_id).exec();
    if (!deletedVacation) throw new ResourceNotFoundError(_id);

    const imagePath = path.join(__dirname, '1-assets', 'images', deletedVacation.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }


  public async getVacationImage(image: string): Promise<string> {

    const imagePath = path.join(__dirname, '..', '1-assets', image);
    console.log('imagePath: ' + imagePath);
    fileSaver.config(imagePath);

    return imagePath;
    } 
}

export const vacationService = new VacationService();
