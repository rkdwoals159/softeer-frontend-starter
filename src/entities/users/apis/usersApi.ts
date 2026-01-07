import { apiClient } from '@/shared/api/client';

import type { UsersResponse } from './usersApi.types';

export async function fetchUsers(page: number) {
  const response = await apiClient.get<UsersResponse>(`/users?page=${page}`);
  return response.data.data;
}
