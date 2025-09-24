import { useState, useEffect } from 'react'

export const useGetStudentSubmissions = (studentId, courseId) => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStudentSubmissions = async () => {
    if (!studentId || !courseId) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/student/submissions?studentId=${studentId}&courseId=${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch student submissions')
      }

      setSubmissions(data.submissions || [])

    } catch (err) {
      console.error('Error fetching student submissions:', err)
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch submissions when studentId or courseId changes
  useEffect(() => {
    fetchStudentSubmissions()
  }, [studentId, courseId])

  // Helper function to get submission for a specific assignment
  const getSubmissionForAssignment = (assignmentId) => {
    return submissions.find(submission => 
      submission.assignmentId === assignmentId || 
      submission.assignmentId._id === assignmentId
    ) || null
  }

  // Helper function to get grade for a specific assignment
  const getGradeForAssignment = (assignmentId) => {
    const submission = getSubmissionForAssignment(assignmentId)
    return submission ? submission.grade : 'N' // Default to 'N' (Not graded yet)
  }

  // Helper function to get status for a specific assignment
  const getStatusForAssignment = (assignmentId) => {
    const submission = getSubmissionForAssignment(assignmentId)
    return submission ? submission.status : 'Pending' // Default to 'Pending'
  }

  // Helper function to get feedback for a specific assignment
  const getFeedbackForAssignment = (assignmentId) => {
    const submission = getSubmissionForAssignment(assignmentId)
    return submission ? submission.feedback : null
  }

  const clearError = () => {
    setError(null)
  }

  const refetch = () => {
    fetchStudentSubmissions()
  }

  return {
    submissions,
    loading,
    error,
    getSubmissionForAssignment,
    getGradeForAssignment,
    getStatusForAssignment,
    getFeedbackForAssignment,
    clearError,
    refetch
  }
}