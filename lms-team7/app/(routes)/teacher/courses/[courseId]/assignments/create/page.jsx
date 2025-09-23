'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const CreateAssignmentPage = () => {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error('Assignment title is required')
      }
      if (!formData.description.trim()) {
        throw new Error('Assignment description is required')
      }
      if (!formData.dueDate) {
        throw new Error('Due date is required')
      }
      // Check if due date is in the future
      const dueDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (dueDate < today) {
        throw new Error('Due date must be in the future')
      }

      const assignmentData = {
        ...formData,
        courseId
      }

      console.log('Creating assignment with data:', assignmentData)
      
      // TODO: Implement actual API call to create assignment
      // const response = await fetch('/api/assignments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(assignmentData)
      // })
      
      // if (!response.ok) {
      //   throw new Error('Failed to create assignment')
      // }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect back to course page on success
      router.push(`/teacher/courses/${courseId}`)
      
    } catch (err) {
      console.error('Error creating assignment:', err)
      setError(err.message || 'Failed to create assignment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link href="/teacher">Dashboard</Link></li>
            <li><Link href="/teacher/courses">Courses</Link></li>
            <li><Link href={`/teacher/courses/${courseId}`}>Course Details</Link></li>
            <li>Create Assignment</li>
          </ul>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">Create New Assignment</h1>
              <p className="text-gray-600">Add a new assignment to this course</p>
            </div>
            <Link href={`/teacher/courses/${courseId}`} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors">
              Cancel
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-xl">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800 font-medium">{error}</span>
                </div>
              )}

              {/* Basic Information Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Assignment Information
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Assignment Title */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a clear and descriptive assignment title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed instructions for the assignment. Include what students need to do, submission requirements, grading criteria, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    rows={6}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Be specific about requirements, submission format, and expectations.
                  </p>
                </div>
              </div>

              {/* Preview Card */}
              {(formData.title || formData.description || formData.dueDate) && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </h3>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    {formData.title && (
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{formData.title}</h4>
                    )}
                    {formData.dueDate && (
                      <p className="text-sm text-gray-600 mb-3">
                        Due: {new Date(formData.dueDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                    {formData.description && (
                      <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Link 
                    href={`/teacher/courses/${courseId}`} 
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={loading || !formData.title.trim() || !formData.description.trim() || !formData.dueDate}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creating Assignment...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Create Assignment
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAssignmentPage