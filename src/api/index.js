import axios from 'axios';
import __env from '../env';

console.log(__env.dataApi);
const instance = axios.create({
  baseURL: __env.dataApi,
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// before a request is made start the loader
instance.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

// before a response is returned stop loader
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
