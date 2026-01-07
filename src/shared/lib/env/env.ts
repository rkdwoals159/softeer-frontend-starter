import { z } from 'zod';
/* TS는 컴파일 타임만 보장하고, 런타임에서는 못막음
Zod는 런타임 실제 값 검증하고, 실패하면 바로 알림/에러 처리 가능.
스키마 하나로 타입도 추론하니까 타입 정의/검증을 따로 쓰지 않아도 됨. */

// 즉 실제 들어오는 데이터가 깨졌을 때 안전장치로 사용됨
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NEXT_PUBLIC_MOCKING: z.enum(['enabled', 'disabled']).optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_MOCKING: process.env.NEXT_PUBLIC_MOCKING,
});
