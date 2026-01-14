export const appKeys = {
  all: ['app'] as const,
};

export const userKeys = {
  all: ['users'] as const,
  list: (params: { page: number }) => ['users', 'list', params] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
};
