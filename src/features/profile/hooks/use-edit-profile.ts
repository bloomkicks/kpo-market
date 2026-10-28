import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditProfileRequest, EditProfileResponse } from '../types';
import { api } from '@/api/client';

export const useEditProfile = (profileId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditProfileRequest) => {
      const response = await api.patch<EditProfileResponse>(`/profiles/me/${profileId}`, data)
      return response.data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}
