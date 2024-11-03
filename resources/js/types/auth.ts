import { User } from './user';

export type AuthUser = User & {
  token: string;
  token_expired_at: string;
};
