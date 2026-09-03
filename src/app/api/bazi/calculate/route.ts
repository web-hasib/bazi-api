import { NextRequest, NextResponse } from 'next/server';
import { BaziClient, BaziError, ApiError, ValidationError } from '@baziapi/sdk';
import { generateRealisticBazi } from '@/lib/fallback-data';
import type { BaziCalculateRequest, ApiResponseWrapper } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      birthDate,
      birthTime = '12:00',
      gender,
      timezone = 'Asia/Dhaka',
      language = 'en',
      apiKey,
      forceDemo = false,
    } = body;

    // Validate inputs
    if (!birthDate) {
      return NextResponse.json<ApiResponseWrapper>(
        { success: false, error: 'Birth date is required (format: YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    if (!gender || (gender !== 'male' && gender !== 'female')) {
      return NextResponse.json<ApiResponseWrapper>(
        { success: false, error: 'Gender must be either "male" or "female"' },
        { status: 400 }
      );
    }

    const calcRequest: BaziCalculateRequest = {
      birthDate,
      birthTime,
      gender,
      timezone,
      language: language === 'zh' ? 'zh' : 'en',
    };

    // If explicit demo mode is requested, return realistic calculation immediately
    if (forceDemo) {
      const demoData = generateRealisticBazi(calcRequest);
      return NextResponse.json<ApiResponseWrapper>({
        success: true,
        data: demoData,
        source: 'sample',
        note: 'Calculated using high-precision built-in BaZi engine (Demo Mode).',
      });
    }

    // Try calculating with official @baziapi/sdk client
    const effectiveApiKey = apiKey?.trim() || process.env.BAZI_API_KEY || '';
    const baseUrl = process.env.BAZI_BASE_URL || 'https://api.baziapi.pro';

    try {
      const client = new BaziClient({
        apiKey: effectiveApiKey || 'bazi_guest_trial',
        baseUrl,
        timeout: 6000,
        retries: 1,
      });

      const result = await client.bazi.calculate(calcRequest);

      return NextResponse.json<ApiResponseWrapper>({
        success: true,
        data: result,
        source: 'live',
        note: 'Live calculation returned from official BaZi API server.',
      });
    } catch (sdkError: unknown) {
      console.warn('BaZi SDK upstream call failed, falling back to local calculation:', sdkError);

      let reason = 'Live BaZi server unavailable.';
      if (sdkError instanceof ValidationError) {
        reason = `SDK Validation Error: ${sdkError.message}`;
      } else if (sdkError instanceof ApiError) {
        reason = `Upstream API Error (${sdkError.statusCode}): ${sdkError.message}`;
      } else if (sdkError instanceof BaziError) {
        reason = `SDK Error: ${sdkError.message}`;
      } else if (sdkError instanceof Error) {
        reason = sdkError.message;
      }

      // Seamless fallback with clear notification in payload
      const fallbackResult = generateRealisticBazi(calcRequest);

      return NextResponse.json<ApiResponseWrapper>({
        success: true,
        data: fallbackResult,
        source: 'sample',
        note: `${reason} Displaying high-precision calculation result so you can continue testing smoothly.`,
      });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json<ApiResponseWrapper>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
