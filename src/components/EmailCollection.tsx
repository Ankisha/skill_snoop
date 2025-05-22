import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

interface EmailCollectionProps {
  onSuccess: () => void
}

export default function EmailCollection({ onSuccess }: EmailCollectionProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      const { error: insertError } = await supabase
        .from('user_emails')
        .insert([{ email }])
      
      if (insertError && insertError.code === '23505') {
        setSuccess(true)
        setEmail('')
        onSuccess()
        return
      }
      
      if (insertError) {
        throw insertError
      }
      
      setSuccess(true)
      setEmail('')
      onSuccess()
    } catch (err: any) {
      console.error('Error details:', err)
      setError(err.message || 'Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">SkillCloud</h1>
            <p className="text-gray-600">Welcome!</p>
          </div>
          <div className="animate-fade-in">
            <p className="text-green-600 text-lg mb-4">✓ You're all set!</p>
            <p className="text-gray-600">Discover the most in-demand data skills...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">SkillCloud</h1>
          <p className="text-gray-600 text-lg">Discover In-Demand Data Skills</p>
        </div>

        <div className="space-y-6">
          {/* <div className="text-center">
            <p className="text-gray-600 mb-4">
              Get real-time insights into trending data science and machine learning skills from top companies
            </p>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Explore Skills'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Stay updated with the latest data science and ML skill trends</p>
          </div>
        </div>
      </div>
    </div>
  )
} 