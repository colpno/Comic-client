import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLoginMutation } from '~/apis/authApis.ts';
import { LoginFormValues } from '~/features/forms/validationSchemas.ts';
import { LoginForm } from '~/features/index.ts';
import { login } from '~/libs/redux/slices/authSlice.ts';
import { useAppDispatch } from '~/libs/redux/store.ts';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loginQuery, { isSuccess }] = useLoginMutation();

  const handleFormSubmit = async (values: LoginFormValues) => {
    try {
      await loginQuery(values);
      dispatch(login());
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      const redirect = searchParams.get('redirect');
      if (redirect) {
        navigate(redirect, { replace: true });
      }
    }
  }, [searchParams, navigate, isSuccess]);

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
