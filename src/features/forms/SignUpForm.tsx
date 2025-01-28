import { CiLock } from 'react-icons/ci';
import { IoMailOpenOutline } from 'react-icons/io5';
import { MdOutlinePermIdentity } from 'react-icons/md';

import { Button, Form, TextField, Typography } from '~/components/index.ts';
import { ROUTE_LOGIN } from '~/constants/routeConstants.ts';
import { signUpFormSchema, SignUpFormValues } from './validationSchemas.ts';

interface Props {
  onSubmit: (values: SignUpFormValues) => void | Promise<void>;
}

function SignUpForm({ onSubmit }: Props) {
  return (
    <div>
      <Typography variant="h2" className="text-center !mb-8 text-main">
        Sign up
      </Typography>
      <Form validationSchema={signUpFormSchema} onSubmit={onSubmit} className="space-y-4">
        {({ formState: { isSubmitting } }) => (
          <>
            <div className="mb-4 space-y-6">
              <TextField
                name="username"
                variant="standard"
                size="small"
                fullWidth
                clearable
                placeholder="Username"
                slotProps={{
                  input: { startAdornment: <MdOutlinePermIdentity size={27} className="mr-2" /> },
                  htmlInput: { className: '!text-lg' },
                }}
              />
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
              Register
            </Button>
            <Button variant="outlined" size="large" fullWidth href={ROUTE_LOGIN}>
              Sign in
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default SignUpForm;
