import { LoginForm } from '~/features/index.ts';

function LoginPage() {
  return (
    <div className="flex items-center justify-center pt-12 pb-20 bg-sub">
      <div className="px-28 pt-12 pb-24 mx-auto bg-main rounded-2xl flex-[0_1_38rem] border dark:border-gray-900 shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
