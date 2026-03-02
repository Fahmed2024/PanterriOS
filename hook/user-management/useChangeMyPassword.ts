'use client';

import { useMutation } from '@tanstack/react-query';
import { changeMyPassword } from '@/services/user-management';
import { ChangePasswordReq } from '@/interface';
import { toast } from 'sonner';

export function useChangeMyPassword() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordReq) => changeMyPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Password changed successfully');
    },
  });
}
