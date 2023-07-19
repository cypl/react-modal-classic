import { useState, useEffect } from "react"

export function useModal() {
  const [modalOpen, setModalOpen] = useState(false)

  // close Modal on keyboard escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const openModal = () => {
    document.getElementsByTagName('html')[0].style.overflowY = "hidden"
    setModalOpen(true)
  }

  const closeModal = () => {
    document.getElementsByTagName('html')[0].style.overflowY = "auto"
    setModalOpen(false)
  }

  return { modalOpen, openModal, closeModal }
}

