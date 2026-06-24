import { NextRequest, NextResponse } from "next/server";
import { getGallery, setGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getGallery();
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  const items = await req.json();
  await setGallery(items);
  return NextResponse.json({ ok: true });
}
