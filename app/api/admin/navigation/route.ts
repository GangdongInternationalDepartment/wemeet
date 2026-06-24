import { NextRequest, NextResponse } from "next/server";
import { getNavigation, setNavigation } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getNavigation();
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  const items = await req.json();
  await setNavigation(items);
  return NextResponse.json({ ok: true });
}
