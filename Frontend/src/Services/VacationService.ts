import axios from 'axios';
import { VacationModel } from '../Models/VacationModel';
import { appConfig } from '../Utils/AppConfig';
import { store, vacationActions } from '../Redux/store';

class VacationService {

  public async getAllVacations() :Promise<VacationModel[]>{
  if (store.getState().vacations.length > 0) {
            return store.getState().vacations;
        }
        const response = await axios.get(appConfig.vacationsUrl);
        
        const data = response.data;

        const action = vacationActions.initVacations(data);
        store.dispatch(action);
        return data;
  }

  public async getVacationsByUserId(userId: string) {
    const response = await axios.get<VacationModel[]>(
      appConfig.vacationsByUserIdUrl + userId
    );
    const vacations = response.data;
    const action = vacationActions.initVacations(vacations);
    store.dispatch(action);
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    const response = await axios.post(appConfig.vacationsUrl, vacation, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    vacation.image = response.data.image;
    if (store.getState().vacations) {
      const action = vacationActions.addVacation(vacation);
      store.dispatch(action);
    }
    return response.data;
  }

  public async deleteVacation(_id: string) {
    // in order to send files/images:
    await axios.delete<VacationModel>(appConfig.vacationsUrl + _id);
    const action = vacationActions.deleteVacation(_id);
    store.dispatch(action);
  }

  public async editVacation(vacation: VacationModel, imageFile: File | null) {
    const formData = new FormData();

    // Add updated vacation fields to FormData
    Object.keys(vacation).forEach((key) => {
      formData.append(key, (vacation as any)[key]);
    });

    // Add image if updated
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Send the PUT request to update the vacation with form data
    try {
      const response = await axios.put<VacationModel>(
        appConfig.vacationsUrl + vacation._id,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const updatedVacation = response.data;
      const action = vacationActions.editVacation(updatedVacation);
      store.dispatch(action);
    } catch (error) {
      console.error('Error editing vacation:', error);
      throw error;
    }
  }
}

export const vacationService = new VacationService();
