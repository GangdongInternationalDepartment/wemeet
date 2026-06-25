import { NextRequest, NextResponse } from "next/server";
import { getMiMeetProgram, setMiMeetProgram } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getMiMeetProgram();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  await setMiMeetProgram(data);
  return NextResponse.json({ ok: true });
}
