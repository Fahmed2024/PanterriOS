'use client';

import { CreateUserReq } from '@/interface';
import { createUser } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserReq) => createUser(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'User created successfully');
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
    },
  });
}
