import { CiLock } from 'react-icons/ci';
import { MdOutlinePermIdentity } from 'react-icons/md';

import { Button, CheckboxGroup, Form, TextField, Typography } from '~/components/index.ts';
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGNUP } from '~/constants/routeConstants.ts';
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
      <Form validationSchema={loginFormSchema} onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-6">
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
          <CheckboxGroup name="rememberMe" options={[{ label: 'Remember me.', value: 'true' }]} />
        </div>
        <div className="flex items-center justify-end">
          <Typography variant="body2" href={ROUTE_FORGOT_PASSWORD}>
            Forgot your password?
          </Typography>
        </div>
        <Button size="large" type="submit" fullWidth>
          Log in
        </Button>
        <Button variant="outlined" size="large" fullWidth href={ROUTE_SIGNUP}>
          Sign up
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
