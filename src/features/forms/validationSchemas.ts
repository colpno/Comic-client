import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
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
