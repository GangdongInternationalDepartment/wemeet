import { getFaq } from "@/lib/data";
import FaqClient from "./client";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const items = await getFaq();
  return <FaqClient items={items} />;
}
