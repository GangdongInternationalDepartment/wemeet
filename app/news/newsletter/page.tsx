import { getNewsletter } from "@/lib/data";
import NewsletterClient from "./client";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const posts = await getNewsletter();
  return <NewsletterClient posts={posts} />;
}
