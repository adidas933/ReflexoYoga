import axios from 'axios';
import { ServiceModel } from '../Models/ServiceModel';
import { serviceActions, store } from '../Redux/store';
import { appConfig } from '../Utils/AppConfig';

class ServiceService {
  public async getAllServices(): Promise<ServiceModel[]> {
    if (store.getState().services.length > 0) {
      return store.getState().services;
    }
    const response = await axios.get(appConfig.servicesUrl);
    const data = response.data;
    const action = serviceActions.initServices(data);
    store.dispatch(action);
    return data;
  }

  public async addService(service: ServiceModel): Promise<void> {
    const response = await axios.post(appConfig.servicesUrl, service, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    service.image = response.data.image;
    if (store.getState().services) {
      const action = serviceActions.addService(service);
      store.dispatch(action);
    }
    return response.data;
  }

  public async deleteService(_id: string) {
    await axios.delete<ServiceModel>(appConfig.servicesUrl + _id);
    const action = serviceActions.deleteService(_id);
    store.dispatch(action);
  }

  public async editService(service: ServiceModel, imageFile: File | null) {
    const formData = new FormData();
    Object.keys(service).forEach((key) => {
      formData.append(key, (service as any)[key]);
    });
    if (imageFile) {
      formData.append('image',imageFile)
    }
    try {
      const response = await axios.put<ServiceModel>(
        appConfig.servicesUrl + service._id,formData, {headers:{'Content-Type': 'multipart/form-data'}}
      );
      const updatedService = response.data
      const action = serviceActions.editService(updatedService)
      store.dispatch(action)
    } catch (error) {
      console.error('Error editing service:', error);
      throw error;

    }
 
  }
}

export const serviceService = new ServiceService();
