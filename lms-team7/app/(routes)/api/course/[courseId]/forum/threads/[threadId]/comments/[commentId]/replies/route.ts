import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/db/connectMongoDB'
import ForumThread from '@/models/forumThread'
import { requireCourseAccess } from '../../../../../_auth'

ForumThread;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; threadId: string; commentId: string }> }
) {
  const { courseId, threadId, commentId } = await params; // ✅ await params
  const access = await requireCourseAccess(courseId);
  if (!access.ok) return NextResponse.json({ error: access.msg }, { status: access.status });

  await connectMongoDB();
  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 });

  const t: any = await (ForumThread as any).findOne({ _id: threadId, courseIdStr: courseId });
  if (!t) return NextResponse.json({ error: 'Thread not found' }, { status: 404 });

  const c: any = t.comments.id(commentId);
  if (!c) return NextResponse.json({ error: 'Comment not found' }, { status: 404 });

  c.replies.unshift({
    authorId: access.cu!.id,
    authorName: access.cu!.fullName || 'Student',
    content,
    reactions: {},
    replies: [],
  });

  await t.save();
  return NextResponse.json(t, { status: 201 });
}
