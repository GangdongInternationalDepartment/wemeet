import type { NavItem, GalleryItem, Slide } from "./types";

// ── 로컬 JSON 폴백 (Firebase 미설정 시 사용) ──────────────────────────────
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function readLocalJSON<T>(filename: string): T | null {
  try {
    const content = fs.readFileSync(path.join(dataDir, filename), "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

function writeLocalJSON(filename: string, data: unknown): void {
  fs.writeFileSync(
    path.join(dataDir, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

// ── Firestore helpers ──────────────────────────────────────────────────────
async function firestoreGet<T>(docId: string): Promise<T | null> {
  const { getDb } = await import("./firebase-admin");
  const doc = await getDb().collection("config").doc(docId).get();
  return doc.exists ? (doc.data() as T) : null;
}

async function firestoreSet(docId: string, data: unknown): Promise<void> {
  const { getDb } = await import("./firebase-admin");
  await getDb().collection("config").doc(docId).set(data as Record<string, unknown>);
}

// ── 기본값 ────────────────────────────────────────────────────────────────
const defaultNavigation: NavItem[] = [
  {
    id: "settlement", ko: "한국정착정보", en: "Settlement Guide", href: "/settlement",
    children: [
      { id: "living", ko: "한국생활정보", en: "Life in Korea", href: "/settlement/living" },
      { id: "language", ko: "다국어학습정보", en: "Language Learning", href: "/settlement/language" },
      { id: "employment", ko: "교육/취업정보", en: "Education & Jobs", href: "/settlement/employment" },
    ],
  },
  {
    id: "about", ko: "위밋 소개", en: "About Us", href: "/about",
    children: [
      { id: "purpose", ko: "설립의도", en: "Our Purpose", href: "/about/purpose" },
      { id: "location", ko: "센터위치", en: "Location", href: "/about/location" },
      { id: "hours", ko: "운영시간", en: "Hours", href: "/about/hours" },
      { id: "partners", ko: "협력기관", en: "Partners", href: "/about/partners" },
    ],
  },
  {
    id: "programs", ko: "위밋 프로그램", en: "Programs", href: "/programs",
    children: [
      { id: "wemeet", ko: "위밋프로그램", en: "WE MEET Program", href: "/programs/wemeet" },
      { id: "mimeet", ko: "미밋프로그램", en: "MI MEET Program", href: "/programs/mimeet" },
      { id: "reviews", ko: "프로그램후기", en: "Reviews", href: "/programs/reviews" },
    ],
  },
  {
    id: "news", ko: "알림공간", en: "News", href: "/news",
    children: [
      { id: "newsletter", ko: "알림톡톡", en: "Newsletter", href: "/news/newsletter" },
      { id: "events", ko: "이벤트", en: "Events", href: "/news/events" },
      { id: "gallery", ko: "갤러리", en: "Gallery", href: "/news/gallery" },
    ],
  },
  {
    id: "consultation", ko: "상담안내/신청", en: "Consultation", href: "/consultation",
    children: [
      { id: "online", ko: "온/오프라인 상담", en: "Online/Offline", href: "/consultation/online" },
      { id: "callcenter", ko: "위밋행복콜센터", en: "Call Center", href: "/consultation/callcenter" },
      { id: "faq", ko: "FAQ", en: "FAQ", href: "/consultation/faq" },
    ],
  },
];

// ── 공개 API ──────────────────────────────────────────────────────────────

export async function getNavigation(): Promise<NavItem[]> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<{ items: NavItem[] }>("navigation");
    return data?.items ?? defaultNavigation;
  }
  return readLocalJSON<NavItem[]>("navigation.json") ?? defaultNavigation;
}

export async function setNavigation(items: NavItem[]): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("navigation", { items });
  } else {
    writeLocalJSON("navigation.json", items);
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<{ items: GalleryItem[] }>("gallery");
    return data?.items ?? [];
  }
  return readLocalJSON<GalleryItem[]>("gallery.json") ?? [];
}

export async function setGallery(items: GalleryItem[]): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("gallery", { items });
  } else {
    writeLocalJSON("gallery.json", items);
  }
}

export async function getSlider(): Promise<Slide[]> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<{ slides: Slide[] }>("slider");
    return data?.slides ?? [];
  }
  return readLocalJSON<Slide[]>("slider.json") ?? [];
}

export async function setSlider(slides: Slide[]): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("slider", { slides });
  } else {
    writeLocalJSON("slider.json", slides);
  }
}
