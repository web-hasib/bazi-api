import { BaziClient } from '@baziapi/sdk';

export function getBaziClient(overrideApiKey?: string): BaziClient {
  const apiKey = overrideApiKey?.trim() || process.env.BAZI_API_KEY;
  const baseUrl = process.env.BAZI_BASE_URL || 'https://api.baziapi.pro';

  if (!apiKey) {
    throw new Error('BAZI_API_KEY is not configured in environment variables or request');
  }

  return new BaziClient({
    apiKey,
    baseUrl,
    timeout: 12000,
    retries: 2,
  });
}
