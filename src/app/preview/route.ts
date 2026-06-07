import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview token', { status: 401 });
  }
  if (!slug) {
    return new Response('Missing slug', { status: 400 });
  }

  const dm = await draftMode();
  dm.enable();
  redirect(`/blog/${slug}`);
}
