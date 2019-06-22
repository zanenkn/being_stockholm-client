import axios from 'axios';

export const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        'access-token': localStorage.getItem(['access-token']),
        client: localStorage.getItem(['client']),
        uid: localStorage.getItem(['uid']),
      };
      console.log(config.headers)
      return config;
    },
    error =>
      Promise.reject(error),
  );
};