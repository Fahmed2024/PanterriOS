import AuthWrapper from '@/components/auth/authWrapper';
import CreatePasswordForm from '@/components/auth/createPasswordForm';

export default function CreatePasswordPage() {
  return (
    <AuthWrapper pageTitle="Create Password">
      <CreatePasswordForm />
    </AuthWrapper>
  );
}
