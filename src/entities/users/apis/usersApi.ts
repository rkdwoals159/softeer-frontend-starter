import { apiClient } from '@/shared/api/client';

import type { User } from '../models/userTypes';

type UsersResponse = {
  data: User[];
};

export async function fetchUsers(page: number) {
  const response = await apiClient.get<UsersResponse>(`/users?page=${page}`);
  return response.data.data;
}
