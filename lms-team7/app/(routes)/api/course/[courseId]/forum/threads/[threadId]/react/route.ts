import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/db/connectMongoDB'
import ForumThread from '@/models/forumThread'
import { requireCourseAccess } from '../../../_auth'

ForumThread;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; threadId: string }> }
) {
  const { courseId, threadId } = await params; // ✅ await params
  const access = await requireCourseAccess(courseId);
  if (!access.ok) return NextResponse.json({ error: access.msg }, { status: access.status });

  await connectMongoDB();
  const { type, target, commentId } = (await req.json()) as {
    type: string;
    target: 'thread' | 'comment';
    commentId?: string;
  };

  const t: any = await (ForumThread as any).findOne({ _id: threadId, courseIdStr: courseId });
  if (!t) return NextResponse.json({ error: 'Thread not found' }, { status: 404 });

  const toggle = (bucket: any) => {
    if (!bucket[type]) bucket[type] = [];
    const idx = bucket[type].indexOf(access.cu!.id);
    if (idx === -1) bucket[type].push(access.cu!.id);
    else bucket[type].splice(idx, 1);
  };

  if (target === 'thread') {
    toggle(t.reactions);
  } else if (target === 'comment' && commentId) {
    const c: any = t.comments.id(commentId);
    if (!c) return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    toggle(c.reactions);
  } else {
    return NextResponse.json({ error: 'Invalid target' }, { status: 400 });
  }

  await t.save();
  return NextResponse.json(t);
}
