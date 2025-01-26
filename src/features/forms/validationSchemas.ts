import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
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
    email: z.string().email(),
    password: z.string().min(12),
    passwordVerification: z.string().min(12),
  })
  .refine((data) => data.password === data.passwordVerification, {
    message: "Passwords don't match",
    path: ['passwordVerification'],
  });
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
