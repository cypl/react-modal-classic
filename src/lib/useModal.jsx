import { useState } from "react"

export function useModal() {
  const [modalOpen, setModalOpen] = useState(false)

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

