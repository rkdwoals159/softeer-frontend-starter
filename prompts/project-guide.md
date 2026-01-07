# Project Guide (Next.js now, TanStack Start later)

This guide summarizes the current direction: start with Next.js (App Router)
but keep the project easy to migrate to TanStack Start.

## Goals

- Use REST API + React Query as the core data layer.
- Keep Next.js-specific features thin and replaceable.
- Make routing replaceable with minimal code movement.

## Migration-friendly layering

Keep Next.js inside `app/` and push real logic elsewhere.

Recommended structure (lightweight FSD):

```
src/
  app/            # Next routing only
  pages/          # optional: route swap target for TanStack Start
  shared/
    api/
    lib/
    ui/
  entities/
    user/
      api/
      model/
      ui/
  features/
    auth/
    user-profile/
  widgets/
    user-list/
  screens/
```

Layering rules:

- Keep `app/` thin and delegate to `screens/` or `widgets/`.
- Store API + React Query wiring in `shared/api` + `entities/*/api`.
- Use `features/` for user actions (search, filter, edit, etc.).
- Use `widgets/` for reusable page sections.
- For small scopes, you can skip either `screens/` or `widgets`.
- Keep any Next-only APIs behind adapters when possible.

## React Query standardization

The goal is a consistent, framework-agnostic data layer.

Guidelines:

- Centralize query keys in `src/lib/react-query/keys.ts`.
- Keep shared query defaults in `src/lib/react-query/options.ts`.
- Split API calls from query hooks:
  - `features/*/api.ts` contains pure request functions.
  - `features/*/queries.ts` wires `useQuery` to those calls.
- Use one error shape via `lib/api/errors.ts`.

Example (shape only, adjust as needed):

`src/lib/react-query/keys.ts`

```ts
export const userKeys = {
  all: ['user'] as const,
  list: (params: { page: number }) => ['user', 'list', params] as const,
  detail: (id: string) => ['user', 'detail', id] as const,
};
```

`src/lib/react-query/options.ts`

```ts
export const defaultQueryOptions = {
  staleTime: 30_000,
  gcTime: 5 * 60_000,
  retry: 1,
};
```

`src/features/user/api.ts`

```ts
import { apiClient } from '@/lib/api/client';

export const fetchUsers = (page: number) => apiClient.get(`/users?page=${page}`);
```

`src/features/user/queries.ts`

```ts
import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/lib/react-query/keys';
import { defaultQueryOptions } from '@/lib/react-query/options';
import { fetchUsers } from './api';

export const useUsers = (page: number) =>
  useQuery({
    queryKey: userKeys.list({ page }),
    queryFn: () => fetchUsers(page),
    ...defaultQueryOptions,
  });
```

## Notes for later migration

- Keep server-only features optional. Avoid deep coupling to
  `next/headers`, `next/cookies`, `next/server` in core flows.
- If you prefetch with `dehydrate`, treat it as an optional optimization.
- The less logic in `app/`, the easier the TanStack Start swap.
