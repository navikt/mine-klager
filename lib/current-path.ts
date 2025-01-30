import { CURRENT_PATH_HEADER } from '@/lib/custom-headers';
import { headers } from 'next/headers';

export const getCurrentPath = async (): Promise<string> => {
  const headerList = await headers();

  return headerList.get(CURRENT_PATH_HEADER) ?? '/';
};
