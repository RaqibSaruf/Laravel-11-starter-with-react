import { ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

/**
 * make return object from axios
 * @param response : AxiosResponse
 * @returns ApiResponse<T>
 */
export function makeResponse<T>(response: AxiosResponse, isError = false): ApiResponse<T> {
  if (isError) {
    return {
      statusCode: response?.status,
      message: response?.data?.message,
      data: null as T,
      errors: response?.data?.errors,
      meta: response?.data?.meta,
    };
  }
  return {
    statusCode: response?.status,
    message: response?.data?.message,
    data: response?.data?.data,
    meta: response?.data?.meta,
  };
}

export const Response = {
  isInvalid: (statusCode: number): boolean => statusCode < 100 || statusCode >= 600,
  isInformational: (statusCode: number): boolean => statusCode >= 100 && statusCode < 200,
  isSuccessfull: (statusCode: number): boolean => statusCode >= 200 && statusCode < 300,
  isRedirection: (statusCode: number): boolean => statusCode >= 300 && statusCode < 400,
  isClientError: (statusCode: number): boolean => statusCode >= 400 && statusCode < 500,
  isServerError: (statusCode: number): boolean => statusCode >= 500 && statusCode < 600,
  isForbidden: (statusCode: number): boolean => 403 === statusCode,
  isNotFound: (statusCode: number): boolean => 404 === statusCode,
  isValidationError: (statusCode: number): boolean => 422 === statusCode,
  isUnauthorized: (statusCode: number): boolean => 401 === statusCode,
  isConflict: (statusCode: number): boolean => 409 === statusCode,
};
