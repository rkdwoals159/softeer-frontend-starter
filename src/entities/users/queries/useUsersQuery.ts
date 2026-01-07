import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/shared/lib/reactQuery/keys';

import { fetchUsers } from '../apis/usersApi';

type UseUsersQueryParams = {
  page: number;
};

export default function useUsersQuery({ page }: UseUsersQueryParams) {
  return useQuery({
    queryKey: userKeys.list({ page }),
    queryFn: () => fetchUsers(page),
  });
}
