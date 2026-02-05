import AuthWrapper from '@/components/auth/authWrapper';
import ForgetPasswordForm from '@/components/auth/forgetPasswordForm';

export default function ForgotpasswordPage() {
  return (
    <AuthWrapper
      pageTitle="Forgot Password?"
      pageSubTitle="Enter your email and we'll send you a verification code"
    >
      <ForgetPasswordForm />
    </AuthWrapper>
  );
}
