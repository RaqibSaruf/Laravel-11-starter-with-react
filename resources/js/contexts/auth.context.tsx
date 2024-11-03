import { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types/user';
import { loginAPI, logoutAPI } from '@/actions/auth.action';
import { useLoader } from '@/hooks/useLoader';
import { AuthUser } from '@/types/auth';
import { Response } from '@/helpers/response.helper';
import { ApiResponse } from '@/types';
import { Cookie } from '@/helpers/storage.helper';
import { useQuery } from '@tanstack/react-query';
import { myProfileAPI } from '@/apis/profile.api';

export interface AuthState {
  isAuthenticated: boolean;
  authUser?: User;
  token: string;
}

export interface AuthContextType {
  authUser?: User;
  isAuthenticated: boolean;
  token: string;
  login: (username: string, password: string) => Promise<ApiResponse<AuthUser>>;
  logout: () => Promise<ApiResponse<unknown>>;
  loading: boolean;
}

const initialState: AuthState = { isAuthenticated: false, token: '' };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setLoader, loading } = useLoader();
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const token = Cookie.get<string>('authToken') ?? authState?.token;

  const { data, isLoading } = useQuery({
    queryKey: ['my-profile'],
    queryFn: () => myProfileAPI(),
    enabled: !!token && !authState?.authUser,
  });

  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data && token && Response.isSuccessfull(data?.statusCode)) {
      setAuthState({
        isAuthenticated: true,
        authUser: data?.data,
        token: token,
      });
    }
  }, [data, token]);

  const login = async (email: string, password: string): Promise<ApiResponse<AuthUser>> => {
    setLoader(true);
    const response = await loginAPI(email, password);
    if (Response.isSuccessfull(response?.statusCode)) {
      setAuthState({
        isAuthenticated: true,
        authUser: response?.data,
        token: String(response?.data?.token),
      });
      Cookie.set('authToken', response?.data?.token, new Date(response?.data?.token_expired_at));
    }
    setLoader(false);
    return response;
  };

  const logout = async (): Promise<ApiResponse<unknown>> => {
    setLoader(true);
    const response = await logoutAPI();
    if (Response.isSuccessfull(response?.statusCode)) {
      setAuthState(initialState);
      Cookie.remove('authToken');
    }
    setLoader(false);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: authState?.authUser,
        token,
        isAuthenticated: authState?.isAuthenticated,
        login,
        logout,
        loading: loading || isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
