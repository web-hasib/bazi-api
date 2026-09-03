import { BaziClient } from '@baziapi/sdk';

export function getBaziClient(customApiKey?: string): BaziClient {
  const apiKey = customApiKey?.trim() || process.env.BAZI_API_KEY || 'bazi_guest_demo';
  const baseUrl = process.env.BAZI_BASE_URL || 'https://api.baziapi.pro';

  return new BaziClient({
    apiKey,
    baseUrl,
    timeout: 8000,
    retries: 1,
  });
}
