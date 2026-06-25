export interface BilingualText {
  ko: string;
  en: string;
}

export interface NavChild {
  id: string;
  ko: string;
  en: string;
  href: string;
}

export interface NavItem {
  id: string;
  ko: string;
  en: string;
  href: string;
  children: NavChild[];
}

export interface GalleryItem {
  id: string;
  src: string;
  title: { ko: string; en: string };
  date: string;
  tag: { ko: string; en: string };
}

export interface Slide {
  id: string;
  src: string;
  title: { ko: string; en: string };
  sub: { ko: string; en: string };
}

// ── 프로그램 페이지 ────────────────────────────────────────────────────────

export interface ProgramPhoto {
  id: string;
  src: string;
  caption: BilingualText;
}

export interface WeMeetActivity {
  id: string;
  icon: string;
  ko: string;
  en: string;
  desc: BilingualText;
}

export interface WeMeetProgram {
  hero: { emoji: string; title: BilingualText; desc: BilingualText };
  info: { day: BilingualText; target: BilingualText; cost: BilingualText };
  activities: WeMeetActivity[];
  photos: ProgramPhoto[];
}

export interface MiMeetInfoItem {
  id: string;
  label: BilingualText;
  value: BilingualText;
}

export interface MiMeetSubject {
  id: string;
  icon: string;
  ko: string;
  en: string;
  desc: BilingualText;
}

export interface MiMeetProgram {
  info: MiMeetInfoItem[];
  subjects: MiMeetSubject[];
  photos: ProgramPhoto[];
  cta: { title: BilingualText; desc: BilingualText };
}

// ── 알림톡톡 & FAQ ────────────────────────────────────────────────────────

export interface NewsletterPost {
  id: string;
  order: number;
  date: string;
  title: BilingualText;
  tag: BilingualText;
  content: BilingualText;
}

export interface FaqItem {
  id: string;
  order: number;
  q: BilingualText;
  a: BilingualText;
}
