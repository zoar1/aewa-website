import { NextResponse } from "next/server";

const UPSTREAM = "https://eorkh6dh9m50sfq.m.pipedream.net";

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 300 } });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream API error", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch job listings" },
      { status: 500 }
    );
  }
}
