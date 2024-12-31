import { z } from 'zod';

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10),
  })
  .required();
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const selectiveFilterFormSchema = z.object({
  includedOptions: z.array(z.string()).optional(),
  excludedOptions: z.array(z.string()).optional(),
});
export type SelectiveFilterFormValues = z.infer<typeof selectiveFilterFormSchema>;
