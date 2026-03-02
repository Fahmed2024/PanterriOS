'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadMyProfilePicture } from '@/services/user-management';
import { toast } from 'sonner';

export function useUploadMyProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => uploadMyProfilePicture(file),
    onSuccess: (data) => {
      toast.success(data.message || 'Profile picture updated successfully');
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
    },
  });
}
