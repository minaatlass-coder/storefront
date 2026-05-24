import { NextRequest, NextResponse } from "next/server";

const PROXY_TIMEOUT_MS = 15_000;

export async function POST(req: NextRequest) {
  const base = process.env.API_URL?.replace(/\/$/, "");
  if (!base) {
    return NextResponse.json(
      { ok: false, error: "API_URL non configurée sur le frontend." },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);
  try {
    const res = await fetch(`${base}/api/track`, {
      method: "POST",
      headers: {
        "content-type": req.headers.get("content-type") ?? "application/json",
        ...(req.headers.get("x-forwarded-for")
          ? { "x-forwarded-for": req.headers.get("x-forwarded-for")! }
          : {}),
        ...(req.headers.get("x-real-ip")
          ? { "x-real-ip": req.headers.get("x-real-ip")! }
          : {}),
        "user-agent": req.headers.get("user-agent") ?? "",
        referer: req.headers.get("referer") ?? "",
      },
      body: await req.text(),
      signal: controller.signal,
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[api/track proxy]", msg);
    return NextResponse.json({ ok: false, error: "Service tracking indisponible." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}

