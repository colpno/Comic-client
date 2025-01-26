import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

import { useResetPasswordMutation } from '~/apis/authApis.ts';
import { ResetPasswordFormValues } from '~/features/forms/validationSchemas.ts';
import { ResetPasswordForm } from '~/features/index.ts';

function ResetPasswordPage() {
  const [submit, { isSuccess }] = useResetPasswordMutation();

  const handleFormSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await submit(values);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Reset password successfully');
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center pt-12 pb-20 bg-sub">
      <div className="px-28 pt-12 pb-24 mx-auto bg-main rounded-2xl flex-[0_1_38rem] border dark:border-gray-900 shadow-lg">
        <ResetPasswordForm onSubmit={handleFormSubmit} />
      </div>
      <Helmet>
        <title>Reset password - Comic</title>
      </Helmet>
    </div>
  );
}

export default ResetPasswordPage;
