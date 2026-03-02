'use client';

import { generateTwoFactorSecret } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export function useGenerateTwoFactorSecret() {
  return useMutation({
    mutationFn: generateTwoFactorSecret,
  });
}
