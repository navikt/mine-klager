import { getSaker } from '@/lib/api';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const saker = await getSaker(await headers());

  return Response.json(saker);
}
