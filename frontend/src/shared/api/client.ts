import axios from 'axios';

import { env } from '@/shared/lib/env/env';

import { normalizeApiError } from './errors';

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
);
