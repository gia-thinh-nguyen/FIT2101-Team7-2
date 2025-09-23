'use client'

import { useGetUser } from '@/hooks/useGetUser'
import { UserPlus } from 'lucide-react'

interface Course {
  _id?: string
  courseId: string
  title: string
  status: 'active' | 'completed' | 'inactive'
  credits: number
  description?: string
  courseDirectorId?: {
    name: string
    email?: string
  }
}

interface User {
  name: string
  status: string
  dateEnrolled?: string
  enrolledCourses?: Course[]
  currentCreditPoints?: number
}



// Updated Course Detail Component (now simplified for list view)
const CourseDetail = ({ course }: { course: Course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
          <p className="text-sm text-blue-600 font-medium">{course.courseId}</p>
        </div>
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            course.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {course.status}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Coordinator:</span>
          <span className="font-medium text-gray-900">
            {course.courseDirectorId?.name || 'Not assigned'}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Credits:</span>
          <span className="font-medium text-gray-900">{course.credits}</span>
        </div>


      </div>

      {course.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>
      )}

      <div className="flex flex-col space-y-2">
        {/* Single View Details Button */}
        <a
          href={`/student/courses/${course.courseId}`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors text-center block"
        >
          View Course Details
        </a>
      </div>
    </div>
  )
}



// Main Courses List Page (unchanged functionality)
export default function CoursesPage() {
  const { user, loading, error, refetch } = useGetUser()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-700">Loading your courses...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Courses</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No User Data Found</h2>
            <p className="text-gray-600">Unable to load your profile information.</p>
          </div>
        </div>
      </div>
    )
  }

  const enrolledCourses = (user as User)?.enrolledCourses || []

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600 mt-1">
                Manage and access your enrolled courses
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Enrolled</div>
                <div className="text-2xl font-bold text-blue-600">
                  {enrolledCourses.length}
                </div>
              </div>
              <button
                onClick={refetch}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Refresh"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrolled Courses</h2>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course: Course) => (
                <CourseDetail
                  key={course._id || course.courseId}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Enrolled</h3>
              <p className="text-gray-500 mb-6">Start your learning journey by enrolling in courses.</p>
              <a
                href="/student/enrol"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Enroll in Courses
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}