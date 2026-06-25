import type {
  NavItem, GalleryItem, Slide,
  WeMeetProgram, MiMeetProgram, NewsletterPost, FaqItem,
} from "./types";

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

// ── WE MEET 프로그램 ───────────────────────────────────────────────────────

const defaultWeMeetProgram: WeMeetProgram = {
  hero: {
    emoji: "🍕🍗",
    title: { ko: "첫 수업 후, 첫 식사!", en: "After the first class, the first meal together!" },
    desc: { ko: "맛있는 피자와 치킨 파티로 한국어 프로그램의 포문을 열었습니다 :)", en: "We kicked off the Korean language program with a delicious pizza and chicken party :)" },
  },
  info: {
    day: { ko: "일요일", en: "Sunday" },
    target: { ko: "외국인 누구나", en: "All Foreigners" },
    cost: { ko: "무료", en: "Free" },
  },
  activities: [
    { id: "a1", icon: "🍳", ko: "한식 쿠킹 클래스", en: "Korean Cooking Class", desc: { ko: "한국 전통 음식을 직접 만들어보는 체험 수업", en: "Hands-on class to make traditional Korean food" } },
    { id: "a2", icon: "🗺️", ko: "랜드마크 투어", en: "Landmark Tour", desc: { ko: "한국의 주요 관광지와 역사 명소를 함께 탐방", en: "Exploring Korea's major tourist spots and historical sites together" } },
    { id: "a3", icon: "🎪", ko: "다자회 (다문화 바자회)", en: "Multicultural Fair", desc: { ko: "다양한 나라의 문화, 음식, 물건을 나누는 바자회", en: "A fair sharing cultures, foods, and goods from various countries" } },
    { id: "a4", icon: "🌏", ko: "세계 음식 체험", en: "World Food Experience", desc: { ko: "여러 나라의 음식을 함께 맛보고 문화를 나누는 시간", en: "Tasting foods from different countries and sharing cultures" } },
  ],
  photos: [
    { id: "p1", src: "/images/gallery/gallery-01.jpg", caption: { ko: "파전 만들기 — 쿠킹 클래스", en: "Making Pajeon — Cooking Class" } },
    { id: "p2", src: "/images/gallery/gallery-03.jpg", caption: { ko: "공예 체험 워크샵", en: "Craft Workshop" } },
    { id: "p3", src: "/images/gallery/gallery-13.png", caption: { ko: "랜드마크 투어 — 경복궁", en: "Landmark Tour — Gyeongbokgung" } },
    { id: "p4", src: "/images/gallery/gallery-12.png", caption: { ko: "첫 수업 파티 🍕🍗", en: "First Class Party 🍕🍗" } },
  ],
};

export async function getWeMeetProgram(): Promise<WeMeetProgram> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<WeMeetProgram>("wemeet-program");
    return data ?? defaultWeMeetProgram;
  }
  return defaultWeMeetProgram;
}

export async function setWeMeetProgram(program: WeMeetProgram): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("wemeet-program", program);
  }
}

// ── MI MEET 프로그램 ──────────────────────────────────────────────────────

const defaultMiMeetProgram: MiMeetProgram = {
  info: [
    { id: "i1", label: { ko: "운영일", en: "Day" }, value: { ko: "화요일 · 목요일", en: "Tue & Thu" } },
    { id: "i2", label: { ko: "시간", en: "Time" }, value: { ko: "19:30 ~ 21:00", en: "19:30–21:00" } },
    { id: "i3", label: { ko: "대상", en: "For" }, value: { ko: "외국인 누구나", en: "All Foreigners" } },
    { id: "i4", label: { ko: "비용", en: "Cost" }, value: { ko: "무료", en: "Free" } },
  ],
  subjects: [
    { id: "s1", icon: "📖", ko: "한국어 수업", en: "Korean Language Class", desc: { ko: "체계적인 커리큘럼으로 한국어를 배웁니다.", en: "Learn Korean with a structured curriculum." } },
    { id: "s2", icon: "🎯", ko: "직업 맞춤 검사", en: "Career Aptitude Test", desc: { ko: "자신에게 맞는 직업을 탐색하는 검사 및 상담", en: "Assessment and counseling to explore suitable career paths." } },
  ],
  photos: [
    { id: "p1", src: "/images/programs/prog-10.jpg", caption: { ko: "WE MEET 프로그램 소개", en: "WE MEET Program Introduction" } },
    { id: "p2", src: "/images/programs/prog-14.jpg", caption: { ko: "한국어 수업 현장", en: "Korean Language Class" } },
    { id: "p3", src: "/images/programs/prog-11.jpg", caption: { ko: "WE MEET 발표", en: "WE MEET Presentation" } },
    { id: "p4", src: "/images/programs/prog-15.jpg", caption: { ko: "마음 표현 — 한국어 수업", en: "Emotions in Korean — Class" } },
  ],
  cta: {
    title: { ko: "MI MEET에 함께하세요", en: "Join MI MEET" },
    desc: { ko: "화요일과 목요일 저녁, 함께 배우고 성장하는 시간을 만들어 드립니다.", en: "Tuesday and Thursday evenings — a time to learn and grow together." },
  },
};

export async function getMiMeetProgram(): Promise<MiMeetProgram> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<MiMeetProgram>("mimeet-program");
    return data ?? defaultMiMeetProgram;
  }
  return defaultMiMeetProgram;
}

export async function setMiMeetProgram(program: MiMeetProgram): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("mimeet-program", program);
  }
}

// ── 알림톡톡 (Newsletter) ─────────────────────────────────────────────────

const defaultNewsletter: NewsletterPost[] = [
  { id: "n1", order: 0, date: "2025.05.15", title: { ko: "[공지] 6월 WE MEET 프로그램 일정 안내", en: "[Notice] June WE MEET Program Schedule" }, tag: { ko: "공지", en: "Notice" }, content: { ko: "6월 WE MEET 프로그램 일정을 안내드립니다. 매주 일요일 다양한 문화 교류 활동이 진행될 예정입니다. 많은 참여 부탁드립니다.", en: "We are pleased to announce the June WE MEET program schedule. Various cultural exchange activities will take place every Sunday. We look forward to your participation." } },
  { id: "n2", order: 1, date: "2025.05.01", title: { ko: "[안내] MI MEET 한국어 수업 5월 커리큘럼 공개", en: "[Info] MI MEET Korean Class May Curriculum" }, tag: { ko: "안내", en: "Info" }, content: { ko: "5월 MI MEET 한국어 수업 커리큘럼을 공개합니다. 화요일과 목요일 19:30~21:00에 진행되며, 초급부터 중급까지 수준별 수업이 제공됩니다.", en: "We are releasing the May MI MEET Korean class curriculum. Classes run Tue & Thu 19:30–21:00, with levels from beginner to intermediate." } },
  { id: "n3", order: 2, date: "2025.04.20", title: { ko: "[이벤트] 다자회 (다문화 바자회) 개최 안내", en: "[Event] Multicultural Fair Announcement" }, tag: { ko: "이벤트", en: "Event" }, content: { ko: "다양한 나라의 음식과 문화를 나누는 다자회가 개최됩니다. 본국의 음식이나 물건을 가져오셔도 됩니다. 모든 분들을 환영합니다!", en: "A multicultural fair sharing food and culture from various countries is being held. Feel free to bring food or items from your home country. Everyone is welcome!" } },
];

export async function getNewsletter(): Promise<NewsletterPost[]> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<{ posts: NewsletterPost[] }>("newsletter");
    return (data?.posts ?? defaultNewsletter).sort((a, b) => a.order - b.order);
  }
  return defaultNewsletter;
}

export async function setNewsletter(posts: NewsletterPost[]): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("newsletter", { posts });
  }
}

// ── FAQ ───────────────────────────────────────────────────────────────────

const defaultFaq: FaqItem[] = [
  { id: "f1", order: 0, q: { ko: "위밋 프로그램은 누구나 참여할 수 있나요?", en: "Can anyone join the WE MEET programs?" }, a: { ko: "네, 한국에 거주하는 외국인이라면 누구나 참여할 수 있습니다. 국적, 체류 유형에 상관없이 환영합니다.", en: "Yes, any foreigner living in Korea is welcome to join. We welcome participants regardless of nationality or visa status." } },
  { id: "f2", order: 1, q: { ko: "프로그램 참여 비용이 있나요?", en: "Is there a fee to participate in programs?" }, a: { ko: "대부분의 위밋 프로그램은 무료로 제공됩니다. 일부 특별 프로그램의 경우 소정의 비용이 발생할 수 있으며, 사전 안내드립니다.", en: "Most WE MEET programs are free of charge. Some special programs may have a small fee, and we will notify you in advance." } },
  { id: "f3", order: 2, q: { ko: "한국어를 못해도 참여할 수 있나요?", en: "Can I participate even if I don't speak Korean?" }, a: { ko: "물론입니다! 다국어 지원 서비스를 통해 영어, 중국어, 베트남어 등으로 소통할 수 있습니다. 한국어를 못하셔도 걱정하지 마세요.", en: "Of course! Through our multilingual support services, we can communicate in English, Chinese, Vietnamese, and more. Don't worry if you don't speak Korean." } },
  { id: "f4", order: 3, q: { ko: "상담은 어떻게 신청하나요?", en: "How do I apply for consultation?" }, a: { ko: "온라인 상담 신청 페이지에서 신청서를 작성하거나, 카카오톡 채널(@위밋다문화행복센터)로 메시지를 보내주세요.", en: "Fill out the form on our online consultation page, or send a message to our KakaoTalk channel (@WEMEETCenter)." } },
  { id: "f5", order: 4, q: { ko: "센터의 정확한 위치는 어디인가요?", en: "Where exactly is the center located?" }, a: { ko: "정확한 위치는 상담 신청 후 개별 안내드립니다. 카카오톡 채널로 문의하시면 빠르게 안내받으실 수 있습니다.", en: "The exact location will be provided individually after your consultation application. Contact us via KakaoTalk for quick assistance." } },
  { id: "f6", order: 5, q: { ko: "MI MEET 한국어 수업의 수준은 어떻게 되나요?", en: "What levels are available for MI MEET Korean classes?" }, a: { ko: "초급부터 중급까지 수준별 수업을 제공합니다. 첫 수업 전에 간단한 레벨 테스트를 진행하여 적합한 반에 배정합니다.", en: "We offer classes from beginner to intermediate level. A brief level test is conducted before the first class to place you in the appropriate group." } },
];

export async function getFaq(): Promise<FaqItem[]> {
  if (isFirebaseConfigured()) {
    const data = await firestoreGet<{ items: FaqItem[] }>("faq");
    return (data?.items ?? defaultFaq).sort((a, b) => a.order - b.order);
  }
  return defaultFaq;
}

export async function setFaq(items: FaqItem[]): Promise<void> {
  if (isFirebaseConfigured()) {
    await firestoreSet("faq", { items });
  }
}
