'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import { env } from '@/shared/lib/env/env';
import Devtools from '@/shared/lib/reactQuery/devTools';
import { queryClient } from '@/shared/lib/reactQuery/queryClient';
import type { ProvidersProps } from './Providers.types';

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const shouldMock =
      process.env.NODE_ENV === 'development' && env.NEXT_PUBLIC_MOCKING !== 'disabled';

    if (!shouldMock) {
      //실제 로직
      return;
    }
    // MSW 모킹 시작
    const startWorker = async () => {
      const { worker } = await import('@/shared/mocks/browser');
      await worker.start({ onUnhandledRequest: 'bypass' });
    };

    startWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Devtools />
    </QueryClientProvider>
  );
}
