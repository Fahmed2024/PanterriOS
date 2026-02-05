import AuthWrapper from '@/components/auth/authWrapper';
import { Verify2faOnLogin } from '@/components/auth/verify2faOnLogin';

export default function LoginPage() {
  return (
    <AuthWrapper
      pageTitle="Two-Factor Authentication"
      pageSubTitle="Enter the 6-digit code from your authenticator app"
      enableBackBtn
    >
      <Verify2faOnLogin />
    </AuthWrapper>
  );
}
