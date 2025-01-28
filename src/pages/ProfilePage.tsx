import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

import { useGetUserQuery, useUpdateUserMutation } from '~/apis/authApis.ts';
import DataFetching from '~/components/DataFetching.tsx';
import { ProfileFormValues } from '~/features/forms/validationSchemas.ts';
import { ProfileForm } from '~/features/index.ts';

function ProfilePage() {
  const { data, isFetching } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const defaultValues: ProfileFormValues = {
    email: data?.email || '',
    password: '',
    passwordVerification: '',
  };

  const handleFormSubmit = async (values: ProfileFormValues) => {
    return updateUser(values).then(() => {
      toast.success('Update successfully');
    });
  };

  if (isFetching) {
    return <DataFetching />;
  }

  return (
    <div className="flex items-center justify-center h-full pt-12 pb-20">
      <div className="px-8 sm:px-14 md:px-28 pt-12 pb-24 mx-auto bg-main rounded-2xl flex-[0_1_38rem] border dark:border-gray-900 shadow-lg">
        <ProfileForm onSubmit={handleFormSubmit} defaultValues={defaultValues} />
      </div>
      <Helmet>
        <title>Profile - Comic</title>
      </Helmet>
    </div>
  );
}

export default ProfilePage;
