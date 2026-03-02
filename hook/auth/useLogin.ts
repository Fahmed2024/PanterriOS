'use client';

import { LoginReq, LoginRes } from '@/interface';
import { getCurrentUser, login } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const { mutateAsync: loginFn, isPending: isLoading } = useMutation({
    mutationFn: async (payload: LoginReq) => login(payload),
    onSuccess: async (data: LoginRes, variables) => {
      toast.success(data.message || 'Login successful');

      if (data.isTwoFactorEnabled && data.temporaryToken) {
        localStorage.setItem('twoFactorTemporaryToken', data.temporaryToken);
        localStorage.setItem('twoFactorUserEmail', variables.email);
        router.push('/login/verify-2fa');
        return;
      }
      if (!data.isTwoFactorEnabled && !data.isTwoFactorSetup) {
        router.push('/login/set-up-2fa');
        return;
      }

      if (!data.accessToken || !data.refreshToken) {
        toast.error('Login did not return tokens.');
        return;
      }

      const currentUser = await getCurrentUser(data.accessToken);

      await setAuth(currentUser, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      router.push('/dashboard');
    },
  });

  return { loginFn, isLoading };
}
