'use client'

import { useState } from 'react'
import { useGetUser } from '@/hooks/useGetUser'
import { UserPlus, Book, FileText, BarChart3, Calendar } from 'lucide-react'

// Updated Types
interface Lesson {
  _id: string
  title: string
  description?: string
  lessonType: 'lecture' | 'tutorial' | 'lab' | 'seminar'
  duration: number // in minutes
  scheduledDate?: string
  status: 'upcoming' | 'completed' | 'in-progress'
  materials?: string[]
}

interface Assignment {
  _id: string
  title: string
  description: string
  dueDate: string
  maxScore: number
  submittedAt?: string
  score?: number
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded'
  type: 'quiz' | 'essay' | 'project' | 'exam'
}

interface Grade {
  _id: string
  assignmentId: string
  assignmentTitle: string
  score: number
  maxScore: number
  percentage: number
  gradedAt: string
  feedback?: string
  letterGrade: string
}

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
  lessons?: Lesson[]
  assignments?: Assignment[]
  grades?: Grade[]
  semester?: string
  year?: number
  enrollmentDate?: string
}

interface User {
  name: string
  status: string
  dateEnrolled?: string
  enrolledCourses?: Course[]
  currentCreditPoints?: number
}

// Tab Component
const TabButton = ({ 
  active, 
  onClick, 
  children, 
  icon: Icon 
}: { 
  active: boolean
  onClick: () => void
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
}) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-4 w-4 mr-2" />
    {children}
  </button>
)

// Lessons Tab Component
const LessonsTab = ({ lessons }: { lessons: Lesson[] }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Course Lessons</h3>
      <span className="text-sm text-gray-500">{lessons.length} lessons</span>
    </div>
    
    {lessons.length > 0 ? (
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  lesson.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : lesson.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {lesson.status}
                </span>
                <span className="text-xs text-gray-500 capitalize">{lesson.lessonType}</span>
              </div>
            </div>
            
            {lesson.description && (
              <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
            )}
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Duration: {lesson.duration} minutes</span>
              {lesson.scheduledDate && (
                <span>Scheduled: {new Date(lesson.scheduledDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">
        <Book className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No lessons available yet</p>
      </div>
    )}
  </div>
)

// Assignments Tab Component
const AssignmentsTab = ({ assignments }: { assignments: Assignment[] }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
      <span className="text-sm text-gray-500">{assignments.length} assignments</span>
    </div>
    
    {assignments.length > 0 ? (
      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  assignment.status === 'graded' 
                    ? 'bg-green-100 text-green-800'
                    : assignment.status === 'submitted'
                    ? 'bg-blue-100 text-blue-800'
                    : assignment.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {assignment.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="capitalize">{assignment.type}</span>
              <div className="text-right">
                <div>Due: {new Date(assignment.dueDate).toLocaleDateString()}</div>
                <div>Max Score: {assignment.maxScore}</div>
                {assignment.score !== undefined && (
                  <div className="font-medium text-gray-700">
                    Score: {assignment.score}/{assignment.maxScore}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">
        <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No assignments available yet</p>
      </div>
    )}
  </div>
)

// Grades Tab Component
const GradesTab = ({ grades }: { grades: Grade[] }) => {
  const averageGrade = grades.length > 0 
    ? grades.reduce((acc, grade) => acc + grade.percentage, 0) / grades.length 
    : 0

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Grades</h3>
        <div className="text-right">
          <div className="text-sm text-gray-500">Overall Average</div>
          <div className="text-xl font-bold text-blue-600">{averageGrade.toFixed(1)}%</div>
        </div>
      </div>
      
      {grades.length > 0 ? (
        <div className="space-y-3">
          {grades.map((grade) => (
            <div key={grade._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{grade.assignmentTitle}</h4>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{grade.letterGrade}</div>
                  <div className="text-sm text-gray-600">
                    {grade.score}/{grade.maxScore} ({grade.percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
              
              {grade.feedback && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Feedback:</strong> {grade.feedback}
                </p>
              )}
              
              <div className="text-xs text-gray-500">
                Graded: {new Date(grade.gradedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No grades available yet</p>
        </div>
      )}
    </div>
  )
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

        <div className="flex justify-between">
          <span>Lessons:</span>
          <span className="font-medium text-gray-900">
            {course.lessons?.length || 0} lessons
          </span>
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

// Course Detail Page Component (this would be a separate page)
export const CourseDetailPage = ({ courseId }: { courseId: string }) => {
  const [activeTab, setActiveTab] = useState('lessons')
  const { user, loading, error } = useGetUser()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-700">Loading course details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Course Not Found</h2>
            <p className="text-red-600">Unable to load course details.</p>
          </div>
        </div>
      </div>
    )
  }

  const course = (user as User)?.enrolledCourses?.find(c => c.courseId === courseId)

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
            <p className="text-gray-600">You are not enrolled in this course.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-blue-600 font-medium mt-1">{course.courseId}</p>
              {course.description && (
                <p className="text-gray-600 mt-2">{course.description}</p>
              )}
            </div>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                course.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {course.status}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Coordinator:</span>
              <div className="font-medium text-gray-900">
                {course.courseDirectorId?.name || 'Not assigned'}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Credits:</span>
              <div className="font-medium text-gray-900">{course.credits}</div>
            </div>
            <div>
              <span className="text-gray-500">Semester:</span>
              <div className="font-medium text-gray-900">
                {course.semester} {course.year}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Enrolled:</span>
              <div className="font-medium text-gray-900">
                {course.enrollmentDate 
                  ? new Date(course.enrollmentDate).toLocaleDateString()
                  : 'N/A'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="flex space-x-1 p-4 border-b border-gray-200">
            <TabButton
              active={activeTab === 'lessons'}
              onClick={() => setActiveTab('lessons')}
              icon={Book}
            >
              Lessons
            </TabButton>
            <TabButton
              active={activeTab === 'assignments'}
              onClick={() => setActiveTab('assignments')}
              icon={FileText}
            >
              Assignments
            </TabButton>
            <TabButton
              active={activeTab === 'grades'}
              onClick={() => setActiveTab('grades')}
              icon={BarChart3}
            >
              Grades
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'lessons' && (
              <LessonsTab lessons={course.lessons || []} />
            )}
            {activeTab === 'assignments' && (
              <AssignmentsTab assignments={course.assignments || []} />
            )}
            {activeTab === 'grades' && (
              <GradesTab grades={course.grades || []} />
            )}
          </div>
        </div>
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