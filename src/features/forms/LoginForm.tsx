import { CiLock } from 'react-icons/ci';
import { IoMailOpenOutline } from 'react-icons/io5';

import { Button, Form, TextField, Typography } from '~/components/index.ts';
import { loginFormSchema, LoginFormValues } from './validationSchemas.ts';

interface Props {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
}

function LoginForm({ onSubmit }: Props) {
  return (
    <div>
      <Typography variant="h2" className="text-center !mb-8 text-main">
        Sign in
      </Typography>
      <Form validationSchema={loginFormSchema} onSubmit={onSubmit}>
        <TextField
          name="email"
          variant="standard"
          fullWidth
          clearable
          placeholder="Email Address"
          slotProps={{
            container: { className: '!mb-4' },
            input: { startAdornment: <IoMailOpenOutline size={27} className="mr-2" /> },
            htmlInput: { className: '!py-4 !text-lg' },
          }}
        />
        <TextField
          name="password"
          type="password"
          variant="standard"
          fullWidth
          placeholder="Password"
          slotProps={{
            container: { className: '!mb-7' },
            input: { startAdornment: <CiLock size={27} className="mr-2" /> },
            htmlInput: { className: '!py-4 !text-lg' },
          }}
        />
        <Button size="large" type="submit" fullWidth className="!mb-4">
          Log in
        </Button>
        <Button variant="outlined" size="large" fullWidth>
          Sign up
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
