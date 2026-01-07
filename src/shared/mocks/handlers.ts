import { http, HttpResponse } from 'msw';

const createUsers = (page: number) =>
  Array.from({ length: 3 }, (_, index) => ({
    id: `user-${page}-${index + 1}`,
    name: `Sample User ${page}-${index + 1}`,
    email: `user${page}${index + 1}@example.com`,
  }));

export const handlers = [
  http.get('*/users', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');

    return HttpResponse.json({
      data: createUsers(Number.isNaN(page) ? 1 : page),
    });
  }),
];
