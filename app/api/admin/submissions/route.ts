import { NextRequest, NextResponse } from "next/server";
import { getSubmissions, updateSubmissionStatus } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const submissions = await getSubmissions();
  return NextResponse.json(submissions);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  await updateSubmissionStatus(id, status);
  return NextResponse.json({ ok: true });
}
