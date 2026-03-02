'use client';

import { Login2FaReq, LoginRes } from '@/interface';
import { getCurrentUser, loginWithTwoFactor } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useVerify2faLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const { mutateAsync: verify2faLoginFn, isPending: isLoading } = useMutation({
    mutationFn: async (payload: Login2FaReq) => loginWithTwoFactor(payload),
    onSuccess: async (data: LoginRes) => {
      if (!data.accessToken || !data.refreshToken) {
        toast.error('2FA verification did not return tokens.');
        return;
      }

      const currentUser = await getCurrentUser(data.accessToken);

      await setAuth(
        currentUser,
        {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      );

      localStorage.removeItem('twoFactorTemporaryToken');
      localStorage.removeItem('twoFactorUserEmail');
      toast.success(data.message || 'Login successful');
      router.push('/dashboard');
    },
  });

  return { verify2faLoginFn, isLoading };
}
