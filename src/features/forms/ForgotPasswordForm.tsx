import { CiLock } from 'react-icons/ci';
import { IoMailOpenOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { Button, Form, TextField, Typography } from '~/components/index.ts';
import { forgotPasswordFormSchema, ForgotPasswordFormValues } from './validationSchemas.ts';

interface Props {
  onSubmit: (values: ForgotPasswordFormValues) => void | Promise<void>;
}

function ForgotPasswordForm({ onSubmit }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h2" className="text-center !mb-8 text-main">
        Forgot password
      </Typography>
      <Form validationSchema={forgotPasswordFormSchema} onSubmit={onSubmit} className="space-y-4">
        {({ formState: { isSubmitting } }) => (
          <>
            <div className="mb-4 space-y-6">
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
            <Button loading={isSubmitting} size="large" type="submit" fullWidth>
              Update
            </Button>
            <Button variant="outlined" size="large" fullWidth onClick={() => navigate(-1)}>
              Go back
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
