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

  public async getInstructorById(_id: string): Promise<InstructorModel> {
    const existingInstructor = store
      .getState()
      .instructors.find((instructor) => instructor._id === _id);
    if (existingInstructor) {
      return existingInstructor;
    }
    const response = await axios.get<InstructorModel>(
      `${appConfig.instructorsUrl}${_id}`
    );
    const instructor = response.data;
    const action = instructorActions.addInstructor(instructor);
    store.dispatch(action);
  }

  public async addInstructor(instructor: InstructorModel): Promise<void[]> {
    const response = await axios.post(appConfig.instructorsUrl, instructor);
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

  public async editInstructor(instructor: InstructorModel) {
    const response = await axios.put<InstructorModel>(
      appConfig.instructorsUrl + instructor._id
    );
    const updatedInstructor = response.data;
    const action = instructorActions.editInstructor(updatedInstructor);
    store.dispatch(action);
  }
}

export const instructorService = new InstructorService();
