import { useState } from "react"

export function useModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [animeOut, setAnimeOut] = useState(false)

  const openModal = () => {
    document.getElementsByTagName('html')[0].style.overflowY = "hidden"
    setModalOpen(true)
  }

  const closeModal = () => {
    document.getElementsByTagName('html')[0].style.overflowY = "auto"
    setAnimeOut(true)
      setTimeout(() => {
        setModalOpen(false)
        setAnimeOut(false)
    }, "600")
  }

  return { modalOpen, openModal, animeOut, closeModal }
}

