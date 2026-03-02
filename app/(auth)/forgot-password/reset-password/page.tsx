import AuthWrapper from '@/components/auth/authWrapper';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthWrapper
      pageTitle="Create New Password"
      pageSubTitle="Enter your new password to secure your account"
      enableBackBtn
    >
      <ResetPasswordForm />
    </AuthWrapper>
  );
}
