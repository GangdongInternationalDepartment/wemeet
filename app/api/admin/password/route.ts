import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword, confirmPassword } = await req.json();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: "모든 필드를 입력하세요." }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "새 비밀번호가 일치하지 않습니다." }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "새 비밀번호는 6자 이상이어야 합니다." }, { status: 400 });
  }

  const db = getDb();
  const settingsDoc = await db.collection("settings").doc("admin").get();
  const savedPassword = settingsDoc.exists ? settingsDoc.data()?.password : null;
  const correctPassword = savedPassword ?? process.env.ADMIN_PASSWORD;

  if (currentPassword !== correctPassword) {
    return NextResponse.json({ error: "현재 비밀번호가 틀렸습니다." }, { status: 401 });
  }

  await db.collection("settings").doc("admin").set({ password: newPassword }, { merge: true });

  return NextResponse.json({ ok: true });
}
