import { User } from '~/types/index.ts';

export interface Authentication {
  email: User['email'];
  password: string;
}
