import { NextRequest, NextResponse } from 'next/server';
import { ApiError, ValidationError, TimeoutError, NetworkError } from '@baziapi/sdk';
import { getBaziClient } from '@/lib/bazi-client';
import type { BaziCalculateRequest, ApiResponse } from '@/lib/types';

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
    } = body;

    // Validate inputs
    if (!birthDate) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Birth date is required (format: YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    if (!gender || (gender !== 'male' && gender !== 'female')) {
      return NextResponse.json<ApiResponse>(
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

    // Instantiate official BaziClient and calculate strictly via @baziapi/sdk
    const client = getBaziClient(apiKey);
    const result = await client.bazi.calculate(calcRequest);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error calculating BaZi via @baziapi/sdk:', error);

    if (error instanceof ValidationError) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: `Validation Error [${error.field}]: ${error.message}` },
        { status: 400 }
      );
    }

    if (error instanceof ApiError) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: `API Error (${error.statusCode}): ${error.message}`,
          statusCode: error.statusCode,
        },
        { status: error.statusCode || 500 }
      );
    }

    if (error instanceof TimeoutError) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: `Request timed out after ${error.timeoutMs}ms` },
        { status: 504 }
      );
    }

    if (error instanceof NetworkError) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Network error: could not connect to BaZi API server' },
        { status: 503 }
      );
    }

    const message = error instanceof Error ? error.message : 'Internal calculation error';
    return NextResponse.json<ApiResponse>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
