import { NextRequest, NextResponse } from "next/server";

const PROXY_TIMEOUT_MS = 30_000;
const COOKIE_NAME = "sahha_admin";

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxy(req: NextRequest, pathSegments: string[]): Promise<NextResponse> {
  const subPath = pathSegments.join("/");

  if (subPath === "logout" && req.method === "POST") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(COOKIE_NAME);
    return res;
  }

  const base = process.env.API_URL?.replace(/\/$/, "");
  if (!base) {
    return NextResponse.json(
      { ok: false, error: "API_URL non configurée." },
      { status: 503 },
    );
  }

  const url = new URL(req.url);
  const target = `${base}/api/admin/${subPath}${url.search}`;

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const headers: Record<string, string> = {
    "content-type": req.headers.get("content-type") ?? "application/json",
  };
  if (token) headers.authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

  try {
    const init: RequestInit = {
      method: req.method,
      headers,
      signal: controller.signal,
    };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = await req.text();
    }

    const res = await fetch(target, init);
    const text = await res.text();
    let json: Record<string, unknown> = {};
    try {
      json = JSON.parse(text) as Record<string, unknown>;
    } catch {
      return new NextResponse(text, { status: res.status });
    }

    const out = NextResponse.json(json, { status: res.status });

    if (subPath === "login" && res.ok && typeof json.token === "string") {
      const ttlHours = Number(process.env.ADMIN_SESSION_TTL_HOURS ?? 24);
      out.cookies.set(COOKIE_NAME, json.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: (Number.isFinite(ttlHours) ? ttlHours : 24) * 3600,
      });
    }

    if (subPath === "logout" && res.ok) {
      out.cookies.delete(COOKIE_NAME);
    }

    return out;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[api/admin proxy]", msg);
    return NextResponse.json({ ok: false, error: "API admin indisponible." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxy(req, path);
}
