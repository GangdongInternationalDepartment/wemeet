/**
 * 최초 1회 실행 — 로컬 JSON 파일 데이터를 Firestore로 마이그레이션
 * 사용법: 로그인 후 브라우저 또는 curl에서 POST /api/admin/seed 호출
 */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getDb } from "@/lib/firebase-admin";

function readLocalJSON<T>(filename: string): T | null {
  try {
    const filePath = path.join(process.cwd(), "data", filename);
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export async function POST() {
  try {
    const db = getDb();
    const results: string[] = [];

    const navigation = readLocalJSON("navigation.json");
    if (navigation) {
      await db.collection("config").doc("navigation").set({ items: navigation });
      results.push("navigation ✓");
    }

    const gallery = readLocalJSON("gallery.json");
    if (gallery) {
      await db.collection("config").doc("gallery").set({ items: gallery });
      results.push("gallery ✓");
    }

    const slider = readLocalJSON("slider.json");
    if (slider) {
      await db.collection("config").doc("slider").set({ slides: slider });
      results.push("slider ✓");
    }

    return NextResponse.json({
      ok: true,
      message: `Firestore 시딩 완료: ${results.join(", ")}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "시딩 실패", detail: String(error) },
      { status: 500 }
    );
  }
}
