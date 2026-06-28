import { NextResponse } from "next/server";
import { getCallCenter } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const info = await getCallCenter();
  return NextResponse.json(info);
}
