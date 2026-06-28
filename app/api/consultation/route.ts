import { NextRequest, NextResponse } from "next/server";
import { addSubmission } from "@/lib/data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, nationality, dob, phone, email, visitDate, inquiry } = body;

  if (!name || !nationality || !phone) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  const submission = await addSubmission({
    name,
    nationality,
    dob: dob ?? "",
    phone,
    email: email ?? "",
    visitDate: visitDate ?? "",
    inquiry: inquiry ?? "",
    submittedAt: new Date().toISOString(),
    status: "pending",
  });

  return NextResponse.json({ ok: true, id: submission.id });
}
