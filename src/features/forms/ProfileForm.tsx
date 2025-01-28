import { CiLock } from 'react-icons/ci';
import { IoMailOpenOutline } from 'react-icons/io5';

import { Button, CheckboxGroup, Form, TextField, Typography } from '~/components/index.ts';
import { FormProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import { profileFormSchema, ProfileFormValues } from './validationSchemas.ts';

interface Props
  extends Omit<FormProps, 'onSubmit' | 'validationSchema' | 'children' | 'defaultValues'> {
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
  defaultValues?: ProfileFormValues;
}

function ProfileForm({ onSubmit, ...props }: Props) {
  return (
    <div>
      <Typography variant="h2" className="text-center !mb-8 text-main">
        Profile
      </Typography>
      <Form
        submitDirtyValuesOnly
        {...props}
        validationSchema={profileFormSchema}
        onSubmit={onSubmit}
        className={cn('space-y-4', props.className)}
      >
        {({ reset, watch }) => {
          const changePassword = watch('changePassword');
          const wantChangePassword = changePassword && changePassword.length > 0;
          return (
            <>
              <div className="mb-4 space-y-4">
                <TextField
                  name="email"
                  variant="standard"
                  size="small"
                  fullWidth
                  clearable
                  placeholder="Email Address"
                  slotProps={{
                    input: { startAdornment: <IoMailOpenOutline size={27} className="mr-2" /> },
                    htmlInput: { className: '!text-lg' },
                  }}
                />
                <div>
                  <CheckboxGroup
                    name="changePassword"
                    options={[{ label: 'Do you want to change password?', value: 'true' }]}
                  />
                  {wantChangePassword && (
                    <div className="mt-2 space-y-4">
                      <TextField
                        name="password"
                        type="password"
                        variant="standard"
                        size="small"
                        fullWidth
                        placeholder="Password"
                        slotProps={{
                          input: { startAdornment: <CiLock size={27} className="mr-2" /> },
                          htmlInput: { className: '!text-lg' },
                        }}
                      />
                      <TextField
                        name="passwordVerification"
                        type="password"
                        variant="standard"
                        size="small"
                        fullWidth
                        placeholder="Password confirmation"
                        slotProps={{
                          input: { startAdornment: <CiLock size={27} className="mr-2" /> },
                          htmlInput: { className: '!text-lg' },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button size="large" type="submit" fullWidth>
                Update
              </Button>
              <Button variant="outlined" size="large" fullWidth onClick={() => reset()}>
                Reset
              </Button>
            </>
          );
        }}
      </Form>
    </div>
  );
}

export default ProfileForm;
