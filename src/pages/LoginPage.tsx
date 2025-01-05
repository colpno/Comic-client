import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { user } from '~/database/user.ts';
import { LoginFormValues } from '~/features/forms/validationSchemas.ts';
import { LoginForm } from '~/features/index.ts';
import { login } from '~/libs/redux/slices/authSlice.ts';
import { useAppDispatch } from '~/libs/redux/store.ts';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleFormSubmit = (values: LoginFormValues) => {
    const redirect = searchParams.get('redirect');

    // TODO: Implement login logic
    console.log('values:', values);
    dispatch(login(user));

    if (redirect) {
      navigate(redirect, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center pt-12 pb-20 bg-sub">
      <div className="px-28 pt-12 pb-24 mx-auto bg-main rounded-2xl flex-[0_1_38rem] border dark:border-gray-900 shadow-lg">
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
      <Helmet>
        <title>Login - Comic</title>
      </Helmet>
    </div>
  );
}

export default LoginPage;
