import axios from 'axios';

type ApiError = {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
};

const DEFAULT_ERROR: ApiError = {
  status: 500,
  message: 'Unexpected error',
};

export function normalizeApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return DEFAULT_ERROR;
  }

  const status = error.response?.status ?? DEFAULT_ERROR.status;
  const data = error.response?.data as
    | { message?: string; code?: string; details?: unknown }
    | undefined;

  return {
    status,
    message: data?.message ?? error.message ?? DEFAULT_ERROR.message,
    code: data?.code,
    details: data?.details,
  };
}

export type { ApiError };
