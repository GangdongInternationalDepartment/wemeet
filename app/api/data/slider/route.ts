import { NextResponse } from "next/server";
import { getSlider } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const slides = await getSlider();
  return NextResponse.json(slides);
}
