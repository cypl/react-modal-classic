import { useCallback, useState } from "react"

export function useModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [animeOut, setAnimeOut] = useState(false)
  const [delay, setDelay] = useState(false)

  const openModal = () => {
    document.getElementsByTagName('html')[0].style.overflowY = "hidden"
    setModalOpen(true)
    if (delay) clearTimeout(delay)
    setDelay(null)
  }

  const closeModal = useCallback(() => {
    if (delay) return
    document.getElementsByTagName('html')[0].style.overflowY = "auto"
    setAnimeOut(true)
    const x = setTimeout(() => {
      setModalOpen(false)
      setAnimeOut(false)
      setDelay(null)
    }, 600)
    setDelay(x)
  }, [])

  return { modalOpen, openModal, animeOut, closeModal }
}

