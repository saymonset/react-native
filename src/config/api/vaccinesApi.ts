import { STAGE, API_URL_V as PROD_URL, API_URL_IOS_V as API_URL_IOS, API_URL_ANDROID_V as API_URL_ANDROID} from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { StorageAdapter } from '../adapters/storage-adapter';


export const API_URL = 
  (STAGE === 'prod')
   ? PROD_URL
   : Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID;



const vaccinesApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// TODO: Interceptors
vaccinesApi.interceptors.request.use(
  async (config) => {

    const token = await StorageAdapter.getItem('token');
    if ( token )  {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);




export {
  vaccinesApi,
}

