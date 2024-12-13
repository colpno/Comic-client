import { CiLock } from 'react-icons/ci';
import { IoMailOpenOutline } from 'react-icons/io5';

import { Button, Form, TextField, Typography } from '~/components/index.ts';
import { loginFormSchema, LoginFormValues } from './validationSchemas.ts';

function LoginForm() {
  const handleSubmit = (values: LoginFormValues) => {
    console.log('values:', values);
  };

  return (
    <div>
      <Typography variant="h1" className="!text-3xl text-center !mb-8 text-main">
        Sign in
      </Typography>
      <Form validationSchema={loginFormSchema} onSubmit={handleSubmit}>
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
        <Button size="large" type="submit" fullWidth disableGutter className="!mb-4">
          Log in
        </Button>
        <Button variant="outlined" size="large" fullWidth disableGutter>
          Sign up
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
