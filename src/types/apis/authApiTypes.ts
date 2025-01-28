import { LoginFormValues } from '~/features/forms/validationSchemas.ts';
import { ApiDataResponse, User } from '~/types/index.ts';

export type ApiLoginParams = LoginFormValues;
export type ApiLoginReturnType = ApiDataResponse<{
  accessToken: string;
}>;

export type ApiGetCSRFReturnType = ApiDataResponse<string>;

export type ApiRegisterParams = {
  email: string;
  password: string;
  passwordVerification: string;
};

export type ApiRefreshAccessToken = ApiLoginReturnType;

export type ApiGetUserReturnType = ApiDataResponse<User>;

export type ApiUpdateUserParams = Partial<ApiRegisterParams>;
