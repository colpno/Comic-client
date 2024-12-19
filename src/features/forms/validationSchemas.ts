import { z } from 'zod';

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10),
  })
  .required();
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const selectiveFilterFormSchema = z
  .object({
    includedOptions: z.array(z.string()).optional(),
    excludedOptions: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      (data.includedOptions && data.includedOptions.length > 0) ||
      (data.excludedOptions && data.excludedOptions.length > 0),
    {
      message: 'At least one item of any panel must be chose',
      path: ['includedOptions', 'excludedOptions'],
    }
  );
export type SelectiveFilterFormValues = z.infer<typeof selectiveFilterFormSchema>;
