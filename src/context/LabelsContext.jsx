import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  STORAGE_KEY,
  deepClone,
  defaultLabels,
  loadStoredLabels,
  setNestedValue,
} from '../labels/defaultLabels'

const LabelsContext = createContext(null)

export function LabelsProvider({ children }) {
  const [labels, setLabels] = useState(() => loadStoredLabels())
  const [adminOpen, setAdminOpen] = useState(false)
  const [draft, setDraft] = useState(() => loadStoredLabels())

  useEffect(() => {
    if (adminOpen) setDraft(deepClone(labels))
  }, [adminOpen, labels])

  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'a'

      if (!isShortcut) return

      event.preventDefault()
      setAdminOpen((open) => !open)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const updateDraft = useCallback((path, value) => {
    setDraft((current) => setNestedValue(current, path, value))
  }, [])

  const saveDraft = useCallback(() => {
    setLabels(deepClone(draft))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    setAdminOpen(false)
  }, [draft])

  const resetDraft = useCallback(() => {
    const defaults = deepClone(defaultLabels)
    setDraft(defaults)
  }, [])

  const resetAndSave = useCallback(() => {
    const defaults = deepClone(defaultLabels)
    setDraft(defaults)
    setLabels(defaults)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
    setAdminOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      labels,
      adminOpen,
      draft,
      setAdminOpen,
      updateDraft,
      saveDraft,
      resetDraft,
      resetAndSave,
    }),
    [labels, adminOpen, draft, updateDraft, saveDraft, resetDraft, resetAndSave],
  )

  return <LabelsContext.Provider value={value}>{children}</LabelsContext.Provider>
}

export function useLabels() {
  const context = useContext(LabelsContext)
  if (!context) throw new Error('useLabels must be used within LabelsProvider')
  return context
}
