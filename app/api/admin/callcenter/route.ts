import { NextRequest, NextResponse } from "next/server";
import { getCallCenter, setCallCenter } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const info = await getCallCenter();
  return NextResponse.json(info);
}

export async function PUT(req: NextRequest) {
  const info = await req.json();
  await setCallCenter(info);
  return NextResponse.json({ ok: true });
}
