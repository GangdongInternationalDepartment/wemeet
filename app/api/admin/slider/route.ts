import { NextRequest, NextResponse } from "next/server";
import { getSlider, setSlider } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const slides = await getSlider();
  return NextResponse.json(slides);
}

export async function PUT(req: NextRequest) {
  const slides = await req.json();
  await setSlider(slides);
  return NextResponse.json({ ok: true });
}
