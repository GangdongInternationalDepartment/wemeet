import { NextRequest, NextResponse } from "next/server";
import { getFaq, setFaq } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getFaq();
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  const items = await req.json();
  await setFaq(items);
  return NextResponse.json({ ok: true });
}
