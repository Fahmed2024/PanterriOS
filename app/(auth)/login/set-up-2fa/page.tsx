import AuthWrapper from '@/components/auth/authWrapper';
import SetUp2FaForm from '@/components/auth/setUp2FaForm';

export default function Setup2FA() {
  return (
    <AuthWrapper
      pageTitle="Set Up 2FA"
      pageSubTitle="Scan the QR code with your authenticator app"
      cardClassName="lg:min-w-3xl"
    >
      <SetUp2FaForm />
    </AuthWrapper>
  );
}
