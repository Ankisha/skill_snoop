import React, { useState, useEffect } from 'react'
import EmailCollection from './components/EmailCollection'
import SkillTagGrid from './components/SkillTagGrid'
import NavigationTabs from './components/NavigationTabs'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage on initial load
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  const [activeTab, setActiveTab] = useState('yc')

  const handleEmailSuccess = () => {
    setIsAuthenticated(true)
    // Store authentication state in localStorage
    localStorage.setItem('isAuthenticated', 'true')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <EmailCollection onSuccess={handleEmailSuccess} />
      </div>
    )
  }

  const renderContent = () => {
    if (activeTab === 'yc') {
      return <SkillTagGrid category="yc" />
    }
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-500">Coming Soon</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">SkillSnoop</h1>
        </div>
      </header>
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  )
}

export default App