import { makeResponse } from '@/helpers/response.helper';
import axios from '@/lib/axios';
import { ApiResponse } from '@/types';
import { User } from '@/types/user';

export const myProfileAPI = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.get('/my-profile');
    return makeResponse<User>(response);
  } catch (error: any) {
    return makeResponse<User>(error?.response, true);
  }
};
