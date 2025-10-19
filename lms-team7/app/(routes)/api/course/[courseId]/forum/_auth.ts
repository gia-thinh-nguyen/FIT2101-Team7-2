import { currentUser } from '@clerk/nextjs/server'
import connectMongoDB from '@/db/connectMongoDB'
import User from '@/models/user'
import Course from '@/models/course'

// Checks if user is a teacher assigned or enrolled student in the course
export async function requireCourseAccess(courseIdStr: string) {
  await connectMongoDB()
  const cu = await currentUser()
  if (!cu) return { ok: false, status: 401 as const, msg: 'Unauthorized' }

  const dbUser = await User.findOne({ clerkId: cu.id })
  if (!dbUser) return { ok: false, status: 404 as const, msg: 'User not found' }

  const course = await Course.findOne({ courseId: courseIdStr })
  if (!course) return { ok: false, status: 404 as const, msg: 'Course not found' }

  // ✅ check both teachers[] and enrolledStudents[]
  const isTeacher = (course.teachers || []).some(
    (t: any) => String(t) === String(dbUser._id)
  )
  const isStudent = (course.enrolledStudents || []).some(
    (s: any) => String(s) === String(dbUser._id)
  )

  if (!isTeacher && !isStudent)
    return { ok: false, status: 403 as const, msg: 'Access denied' }

  return { ok: true, cu, dbUser, course }
}
