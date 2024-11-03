import { queryStringifyOptions } from '@/contexts/router-query.context';
import { Cookie } from '@/helpers/storage.helper';
import Axios from 'axios';
import qs from 'qs';

const axios = Axios.create({
  baseURL: (import.meta as any).env.VITE_API_ENDPOINT_V1 ?? '',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params, queryStringifyOptions),
});

// Set request interceptor
axios.interceptors.request.use(async (config) => {
  const token = Cookie.get('authToken');
  if (token) {
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = { Authorization: `Bearer ${token}` } as any;
    }
  }
  return config;
});

axios.interceptors.response.use(async (response) => {
  return response;
});

export default axios;
