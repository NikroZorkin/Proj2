import { NextResponse } from "next/server";
import type { ApiError } from "@/types/coin";

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vsCurrency = searchParams.get("vs_currency") || "usd";

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&per_page=50&order=market_cap_desc&sparkline=true`;

  try {
    const res = await fetch(url, {
      headers: process.env.COINGECKO_DEMO_KEY
        ? { "x-cg-demo-api-key": process.env.COINGECKO_DEMO_KEY }
        : {},
      next: { revalidate: 60, tags: ["coins"] },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json<ApiError>(
        { error: `Upstream ${res.status}: ${body.slice(0, 200)}` },
        { status: 502 }
      );
    }

    return NextResponse.json(await res.json());
  } catch (e) {
    return NextResponse.json<ApiError>(
      { error: (e as Error).message },
      { status: 502 }
    );
  }
}

