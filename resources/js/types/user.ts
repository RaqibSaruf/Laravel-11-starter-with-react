import { Role } from './role-permission';

export interface User {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  roles: Role[];
}
