import { User } from '@/types/user';

const mockUser: User = { id: '1', name: 'John Doe', email: 'test1@example.com', roles: [{ id: 2, name: 'user' }] };
const mockAdmin: User = { id: '2', name: 'Admin', email: 'test2@example.com', roles: [{ id: 1, name: 'admin' }] };

export const loginAPI = (username: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username === 'admin' && password === '12345678' ? mockAdmin : mockUser);
    }, 500);
  });
};

export const logoutAPI = () => {
  console.log('Logged out');
};
