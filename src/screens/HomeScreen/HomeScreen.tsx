import Button from '@/shared/ui/Button/Button';
import type { HomeScreenProps } from './HomeScreen.types';

export default function HomeScreen({ title = 'Next.js 16 Starter' }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-lg font-semibold text-zinc-900">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            {title}
          </div>
          <div className="flex items-center gap-3">
            <Button label="Docs" variant="ghost" />
            <Button label="Launch" />
          </div>
        </header>

        <main className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
              Move fast with a migration-friendly Next.js foundation.
            </h1>
            <p className="text-lg text-zinc-600">
              App Router stays thin, domain logic lives in entities and features, and React Query
              keeps data fetching portable if you move to TanStack Start later.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button label="Create Project" />
              <Button label="View Guide" variant="ghost" />
            </div>
          </section>

          <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">What is ready?</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>FSD-lite folder structure</li>
              <li>React Query + Axios baseline</li>
              <li>Storybook + E2E tooling</li>
              <li>Prettier + ESLint + Husky hooks</li>
            </ul>
          </aside>
        </main>
      </div>
    </div>
  );
}
