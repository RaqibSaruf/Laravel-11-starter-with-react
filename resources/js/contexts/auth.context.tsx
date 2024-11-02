import { createContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';
import { loginAPI, logoutAPI } from '@/actions/auth.action';
import { useLoader } from '@/hooks/useLoader';

export interface AuthState {
  isAuthenticated: boolean;
  authUser?: User;
  token: string;
}

export interface AuthContextType {
  authUser?: User;
  isAuthenticated: boolean;
  token: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = { isAuthenticated: false, token: '' };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const authUser = authState?.authUser;
  const token = authState?.token;
  const isAuthenticated = authState?.isAuthenticated;
  const { setLoader } = useLoader();

  const login = async (username: string, password: string) => {
    setLoader(true);
    const user = await loginAPI(username, password);
    setAuthState({ isAuthenticated: true, authUser: user, token: '' });
    setLoader(false);
  };

  const logout = () => {
    logoutAPI();
    setAuthState(initialState);
  };

  return (
    <AuthContext.Provider value={{ authUser, token, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
  );
};
