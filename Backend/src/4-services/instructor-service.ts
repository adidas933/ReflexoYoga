import path from 'path';
import {
  ResourceNotFoundError,
  ValidationError,
} from '../3-models/client-errors';
import { IInstructorModel, InstructorModel } from '../3-models/instructorModel';
import fs from 'fs';

class InstructorService {
  public async getAllInstructors() {
    const instructors = await InstructorModel.find().exec();
    return instructors;
  }


  public async addInstructor(instructor: IInstructorModel) {
    const error = instructor.validateSync();
    if (error) throw new ValidationError(error.message);
    return await instructor.save();
  }

  public async editInstructor(instructor: IInstructorModel) {
    const error = instructor.validateSync();
    if (error) throw new ValidationError(error.message);
    const updatedInstructor = await InstructorModel.findByIdAndUpdate(
      instructor._id,
      instructor,
      { returnOriginal: false }
    ).exec();
    if (!updatedInstructor)
      throw new ResourceNotFoundError(instructor._id.toString());
    return updatedInstructor;
  }

  public async deleteInstructor(_id: string) {
    const deletedInstructor = await InstructorModel.findByIdAndDelete(
      _id
    ).exec();
    if (!deletedInstructor) throw new ResourceNotFoundError(_id);
    const imagePath = path.join(
      __dirname,
      '1-assets',
      'images',
      deletedInstructor.image
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  public async getInstructorImage(image: string): Promise<string> {
    const imagePath = path.join(__dirname, '..', '1-assets', image);
    console.log('imagePath: ' + imagePath);
    return imagePath;
  }
}

export const instructorSerivce = new InstructorService();
