import { NextResponse } from "next/server";
import type { ApiError } from "@/types/coin";

export const revalidate = 60;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const vsCurrency = searchParams.get("vs_currency") || "usd";

    const url = `https://api.coingecko.com/api/v3/coins/${id}`;

    const res = await fetch(url, {
      headers: process.env.COINGECKO_DEMO_KEY
        ? { "x-cg-demo-api-key": process.env.COINGECKO_DEMO_KEY }
        : {},
      next: { revalidate: 60, tags: ["coin"] },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json<ApiError>(
        { error: `Upstream ${res.status}: ${body.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const priceKey = vsCurrency.toLowerCase();
    const price = data.market_data?.current_price?.[priceKey as keyof typeof data.market_data.current_price] || 0;
    const marketCap = data.market_data?.market_cap?.[priceKey as keyof typeof data.market_data.market_cap] || 0;
    const totalVolume = data.market_data?.total_volume?.[priceKey as keyof typeof data.market_data.total_volume] || 0;
    const high24h = data.market_data?.high_24h?.[priceKey as keyof typeof data.market_data.high_24h] || 0;
    const low24h = data.market_data?.low_24h?.[priceKey as keyof typeof data.market_data.low_24h] || 0;
    const priceChange7d = data.market_data?.price_change_percentage_7d_in_currency?.[priceKey as keyof typeof data.market_data.price_change_percentage_7d_in_currency] || 0;

    const coinDetail = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.small || data.image?.large || "",
      current_price: price,
      price_change_percentage_24h:
        data.market_data?.price_change_percentage_24h || 0,
      market_cap: marketCap,
      sparkline_in_7d: {
        price: data.market_data?.sparkline_7d?.price || [],
      },
      total_volume: totalVolume,
      high_24h: high24h,
      low_24h: low24h,
      price_change_percentage_7d: priceChange7d,
    };

    return NextResponse.json(coinDetail);
  } catch (e) {
    return NextResponse.json<ApiError>(
      { error: (e as Error).message },
      { status: 502 }
    );
  }
}

