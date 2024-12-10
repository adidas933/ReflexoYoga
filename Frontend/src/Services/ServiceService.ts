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

  public async getServiceById(_id: string): Promise<ServiceModel> {
    const existingService = store
      .getState()
      .services.find((service) => service._id === _id);
    if (existingService) {
      return existingService;
    }
    const response = await axios.get<ServiceModel>(
      `${appConfig.servicesUrl}${_id}`
    );
    const service = response.data;
    const action = serviceActions.addService(service);
    store.dispatch(action);
  }

  public async addService(service: ServiceModel): Promise<void[]> {
    const response = await axios.post(appConfig.servicesUrl, service);
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

  public async editService(service: ServiceModel) {
    const response = await axios.put<ServiceModel>(
      appConfig.servicesUrl + service._id
    );
    const updatedService = response.data;
    const action = serviceActions.editService(updatedService);
    store.dispatch(action);
  }
}

export const serviceService = new ServiceService();
