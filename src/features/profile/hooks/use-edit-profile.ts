import { useMutation } from '@tanstack/react-query';
import type { EditProfileRequest, EditProfileResponse, ProfileResponse } from '../types';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useEditProfile = (profileId?: string) => {
  return useMutation({
    mutationFn: async (data: EditProfileRequest) => {
      const response = await api.patch<EditProfileResponse>(`profiles/me/${profileId}`, data)
      return response.data
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<ProfileResponse>(['profile'], (old) =>
        old?.map((p) => p.id === updated.id ? updated : p)
      )
    }
  })
}