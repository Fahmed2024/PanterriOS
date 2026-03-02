'use client';
import AuthWrapper from '@/components/auth/authWrapper';
import { VerifyForgetPasswordOTPForm } from '@/components/auth/verifyForgetPasswordOTPForm';
import { useCountdown } from '@/lib/timeCounter';
import { useState } from 'react';

export default function VerifyOtpPage() {
  const [email] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('resetPasswordEmail')
      : null,
  );
  const counter = useCountdown(40);

  // Obscure email function
  function obscureEmail(email: string) {
    const [user, domain] = email.split('@');
    const visiblePart = user.slice(0, 2);
    const maskedPart = '*'.repeat(user.length - 2);
    return `${visiblePart}${maskedPart}@${domain}`;
  }
  return (
    <AuthWrapper
      pageTitle="Check Your Email"
      pageSubTitle={`We sent a verification code to ${obscureEmail(email || 'admin@panterrium.com')} `}
      enableBackBtn
    >
      <VerifyForgetPasswordOTPForm counter={counter} email={email} />
    </AuthWrapper>
  );
}
