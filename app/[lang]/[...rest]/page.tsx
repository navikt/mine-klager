import { pageNotFound } from '@/lib/server/not-found';

// Catches all unmatched paths, so they render `app/[lang]/not-found.tsx` instead of Next's default 404 page.
export default async function CatchAllPage() {
  return pageNotFound();
}
