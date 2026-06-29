import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json({ error: "비밀번호를 입력하세요." }, { status: 401 });
  }

  const db = getDb();
  const settingsDoc = await db.collection("settings").doc("admin").get();
  const savedPassword = settingsDoc.exists ? settingsDoc.data()?.password : null;
  const correctPassword = savedPassword ?? process.env.ADMIN_PASSWORD;

  if (password !== correctPassword) {
    return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
  }

  const token = process.env.ADMIN_TOKEN!;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
