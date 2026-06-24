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
