import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../lib/TokenHandler';



const apiService =  Axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

apiService.interceptors.request.use(
  async function  (config)  {
    const token = await getToken()
    if (token) {
      config.headers = {
        'Authorization': 'Bearer '+token,
        'Accept':'application/json'
      }
    }
    return config
  },
  function (error)  {
    Promise.reject(error)
  }
);


export default apiService;
