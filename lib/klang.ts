import { isDeployedToProd } from '@/lib/environment';

export const KLANG_DOMAIN = isDeployedToProd ? 'https://klage.nav.no' : 'https://klage.intern.dev.nav.no';
