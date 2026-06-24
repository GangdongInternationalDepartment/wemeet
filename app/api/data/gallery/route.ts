import { NextResponse } from "next/server";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getGallery();
  return NextResponse.json(items);
}
