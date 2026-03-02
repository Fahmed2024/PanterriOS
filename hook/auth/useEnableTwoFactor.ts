'use client';

import { enableTwoFactor } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useEnableTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enableTwoFactor,
    onSuccess: (data) => {
      toast.success(data.message || '2FA enabled successfully');
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
    },
  });
}
