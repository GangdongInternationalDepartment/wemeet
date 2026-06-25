import { NextRequest, NextResponse } from "next/server";
import { getWeMeetProgram, setWeMeetProgram } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getWeMeetProgram();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  await setWeMeetProgram(data);
  return NextResponse.json({ ok: true });
}
