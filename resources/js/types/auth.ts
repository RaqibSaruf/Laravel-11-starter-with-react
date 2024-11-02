import { User } from './user';

export type AuthUser = User & {
  is_verified: boolean;
  token: string;
  token_expired_at: string;
};
