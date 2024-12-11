import axios from 'axios';
import { InstructorModel } from '../Models/InstructorModel';
import { instructorActions, store } from '../Redux/store';
import { appConfig } from '../Utils/AppConfig';

class InstructorService {
  public async getAllInstructors(): Promise<InstructorModel[]> {
    if (store.getState().instructors.length > 0) {
      return store.getState().instructors;
    }
    const response = await axios.get(appConfig.instructorsUrl);
    const data = response.data;
    const action = instructorActions.initInstructors(data);
    store.dispatch(action);
    return data;
  }

  public async addInstructor(instructor: InstructorModel): Promise<void> {
    const response = await axios.post(appConfig.instructorsUrl, instructor, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    instructor.image = response.data.image;
    if (store.getState().instructors) {
      const action = instructorActions.addInstructor(instructor);
      store.dispatch(action);
    }
    return response.data;
  }

  public async deleteInstructor(_id: string) {
    await axios.delete<InstructorModel>(appConfig.instructorsUrl + _id);
    const action = instructorActions.deleteInstructor(_id);
    store.dispatch(action);
  }

  public async editInstructor(
    instructor: InstructorModel,
    imageFile: File | null
  ) {
    const formData = new FormData();
    Object.keys(instructor).forEach((key) => {
      formData.append(key, (instructor as any)[key]);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try {
      const response = await axios.put<InstructorModel>(
        appConfig.instructorsUrl + instructor._id,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const updatedInstructor = response.data;
      const action = instructorActions.editInstructor(updatedInstructor);
      store.dispatch(action);
    } catch (error) {
      console.error('Error editing instructor: ', error);
    }
  }
}

export const instructorService = new InstructorService();
