import { User } from './userTypes.ts';

export interface Authentication {
  email: User['email'];
  password: string;
}
