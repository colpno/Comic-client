import { z } from 'zod';

const PASSWORD_LENGTH = 12;

export const loginFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(PASSWORD_LENGTH),
  rememberMe: z
    .array(z.enum(['true']))
    .transform((val) => val[0])
    .optional(),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const selectiveFilterFormSchema = z.object({
  includedOptions: z.array(z.string()).optional(),
  excludedOptions: z.array(z.string()).optional(),
});
export type SelectiveFilterFormValues = z.infer<typeof selectiveFilterFormSchema>;

export const signUpFormSchema = z
  .object({
    username: loginFormSchema.shape.username,
    email: z.string().email(),
    password: loginFormSchema.shape.password,
    passwordVerification: loginFormSchema.shape.password,
  })
  .refine((data) => data.password === data.passwordVerification, {
    message: "Passwords don't match",
    path: ['passwordVerification'],
  });
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const forgotPasswordFormSchema = z
  .object({
    email: z.string().email(),
    password: loginFormSchema.shape.password,
    passwordVerification: loginFormSchema.shape.password,
  })
  .refine((data) => data.password === data.passwordVerification, {
    message: "Passwords don't match",
    path: ['passwordVerification'],
  });
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export const profileFormSchema = z.object({
  email: z.string().email().optional(),
  changePassword: z
    .array(z.enum(['true']))
    .length(1)
    .optional()
    .or(z.array(z.never()).optional()),
  password: loginFormSchema.shape.password.optional(),
  passwordVerification: loginFormSchema.shape.password.optional(),
});
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
