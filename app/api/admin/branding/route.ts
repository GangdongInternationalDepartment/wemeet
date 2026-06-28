import { NextRequest, NextResponse } from "next/server";
import { getBranding, setBranding } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const branding = await getBranding();
  return NextResponse.json(branding);
}

export async function PUT(req: NextRequest) {
  const branding = await req.json();
  await setBranding(branding);
  return NextResponse.json({ ok: true });
}
