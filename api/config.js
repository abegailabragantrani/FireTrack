import Axios from 'axios';
import { getToken } from '../lib/TokenHandler';
import { Platform } from 'react-native';

// CHANGE THE IP ADDRESS BELOW TO YOUR LOCAL IP ADDRESS
// In my case my local IP address is 192.168.1.31

const baseURL = Platform.OS === 'android' ?
 'http://10.0.2.2:8000/api' 
 : 
 'http://192.168.1.7:8000/api'

const apiService =  Axios.create({
  baseURL: baseURL,
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
      console.log(error);
      throw error
  }
);

apiService.interceptors.response.use(
  async function  (config)  {
    return config
  },
  function (error)  {
    throw error
  }
);


export default apiService;
