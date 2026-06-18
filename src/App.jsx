import { useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhatYouGet from './components/WhatYouGet'
import HowItWorks from './components/HowItWorks'
import Compensation from './components/Compensation'
import RightsSafety from './components/RightsSafety'
import FAQ from './components/FAQ'
import ApplicationForm from './components/ApplicationForm'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import { useLabels } from './context/LabelsContext'

const sectionConfig = [
  { id: 'overview', labelKey: 'overview', Component: Hero },
  { id: 'how-it-works', labelKey: 'howItWorks', Component: HowItWorks },
  { id: 'payout', labelKey: 'payout', Component: Compensation },
  { id: 'benefits', labelKey: 'benefits', Component: WhatYouGet },
  { id: 'rights', labelKey: 'rights', Component: RightsSafety },
  { id: 'faq', labelKey: 'faq', Component: FAQ },
  { id: 'apply', labelKey: 'apply', Component: ApplicationForm },
]

export default function App() {
  const { labels } = useLabels()
  const [activeSection, setActiveSection] = useState('overview')

  const sections = useMemo(
    () =>
      sectionConfig.map(({ id, labelKey, Component }) => ({
        id,
        label: labels.nav[labelKey],
        Component,
      })),
    [labels.nav],
  )

  const { Component } = sections.find((s) => s.id === activeSection) ?? sections[0]

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1">
        <Component onNavigate={setActiveSection} key={activeSection} />
      </main>
      <Footer />
      <AdminDashboard />
    </div>
  )
}
