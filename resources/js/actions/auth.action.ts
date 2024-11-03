import { makeResponse } from '@/helpers/response.helper';
import axios from '@/lib/axios';
import { ApiResponse } from '@/types';
import { AuthUser } from '@/types/auth';

export const loginAPI = async (email: string, password: string): Promise<ApiResponse<AuthUser>> => {
  try {
    const response = await axios.post('/login', { email, password });
    return makeResponse<AuthUser>(response);
  } catch (error: any) {
    return makeResponse<AuthUser>(error?.response, true);
  }
};

export const logoutAPI = async (logoutFromAllDevice = false): Promise<ApiResponse<unknown>> => {
  try {
    const response = await axios.delete('/logout', { data: { logout_from_all_device: logoutFromAllDevice } });
    return makeResponse<unknown>(response);
  } catch (error: any) {
    return makeResponse<unknown>(error?.response, true);
  }
};
