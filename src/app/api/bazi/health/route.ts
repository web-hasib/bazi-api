import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseUrl = process.env.BAZI_BASE_URL || 'https://api.baziapi.pro';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    let status = 'down';
    let statusCode = 0;

    try {
      const res = await fetch(`${baseUrl}/api/v1/bazi/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
        signal: controller.signal,
      });
      statusCode = res.status;
      // 401/400/422 means server is reachable and processing requests
      if (res.status === 401 || res.status === 400 || res.status === 422 || res.status === 200) {
        status = 'reachable';
      } else {
        status = `degraded (${res.status})`;
      }
    } catch {
      status = 'unreachable';
    } finally {
      clearTimeout(timeout);
    }

    return NextResponse.json({
      status,
      statusCode,
      baseUrl,
      sdkVersion: '1.0.4',
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    return NextResponse.json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}
