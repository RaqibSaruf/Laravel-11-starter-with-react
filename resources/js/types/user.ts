import { Role } from './role-permission';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}
