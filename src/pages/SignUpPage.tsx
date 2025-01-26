import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

import { useRegisterMutation } from '~/apis/authApis.ts';
import { SignUpFormValues } from '~/features/forms/validationSchemas.ts';
import { SignUpForm } from '~/features/index.ts';

function SignUpPage() {
  const [signUpQuery, { isSuccess }] = useRegisterMutation();

  const handleFormSubmit = async (values: SignUpFormValues) => {
    try {
      await signUpQuery(values);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Sign Up successfully');
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center pt-12 pb-20 bg-sub">
      <div className="px-28 pt-12 pb-24 mx-auto bg-main rounded-2xl flex-[0_1_38rem] border dark:border-gray-900 shadow-lg">
        <SignUpForm onSubmit={handleFormSubmit} />
      </div>
      <Helmet>
        <title>Sign up - Comic</title>
      </Helmet>
    </div>
  );
}

export default SignUpPage;
