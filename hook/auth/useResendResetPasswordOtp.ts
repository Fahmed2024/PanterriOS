'use client';

import { SendOtpReq } from '@/interface';
import { resendResetPasswordOtp } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useResendResetPasswordOtp() {
  const { mutateAsync: resendResetPasswordOtpFn, isPending: isLoading } =
    useMutation({
      mutationFn: async (payload: SendOtpReq) => resendResetPasswordOtp(payload),
      onSuccess: (data) => {
        toast.success(data.message || 'OTP resent successfully');
      },
    });

  return { resendResetPasswordOtpFn, isLoading };
}
