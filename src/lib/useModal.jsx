import { useCallback, useState } from "react"

export function useModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [animeOut, setAnimeOut] = useState(false)
  const [delay, setDelay] = useState(false)

  const openModal = () => {
    document.getElementsByTagName('html')[0].style.overflowY = "hidden"
    document.getElementsByTagName('main')[0].setAttribute("aria-hidden", "true")
    setModalOpen(true)
    if (delay) clearTimeout(delay)
    setDelay(null)
  }

  const closeModal = useCallback(() => {
    if (delay) return
    document.getElementsByTagName('html')[0].removeAttribute("style")
    document.getElementsByTagName('main')[0].removeAttribute("aria-hidden")
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

