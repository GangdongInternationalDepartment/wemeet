import { NextRequest, NextResponse } from "next/server";
import { getNewsletter, setNewsletter } from "@/lib/data";
import type { NewsletterPost } from "@/lib/types";

export const dynamic = "force-dynamic";

function genId() {
  return `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export async function GET() {
  const posts = await getNewsletter();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const posts = await getNewsletter();
  const newPost: NewsletterPost = {
    id: genId(),
    order: posts.length,
    date: body.date ?? new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    title: body.title,
    tag: body.tag,
    content: body.content,
  };
  await setNewsletter([newPost, ...posts.map((p, i) => ({ ...p, order: i + 1 }))]);
  return NextResponse.json(newPost);
}

export async function PUT(req: NextRequest) {
  const posts: NewsletterPost[] = await req.json();
  await setNewsletter(posts);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const posts = await getNewsletter();
  const updated = posts
    .filter((p) => p.id !== id)
    .map((p, i) => ({ ...p, order: i }));
  await setNewsletter(updated);
  return NextResponse.json({ ok: true });
}
