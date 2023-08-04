import { React, useState, useCallback, createContext } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
   
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState()
    const [animeOut, setAnimeOut] = useState(false)

    const openModal = (modalContent) => {
        document.getElementsByTagName('html')[0].style.overflowY = "hidden"
        document.getElementsByTagName('main')[0].setAttribute("aria-hidden", "true")
        setModalOpen(true)
        setModalContent(modalContent)
    }

    const closeModal = useCallback(() => {
        document.getElementsByTagName('html')[0].removeAttribute("style")
        document.getElementsByTagName('main')[0].removeAttribute("aria-hidden")
        setAnimeOut(true)
        setTimeout(() => {
            setModalOpen(false)
            setModalContent()
            setAnimeOut(false)
        }, 600)
    }, [])

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Modal 
                modalOpen={modalOpen} 
                closeModal={closeModal} 
                animeOut={animeOut} 
                modalContent={modalContent}
                // options to pass as argument in openModal()
                closebutton="out" // "in", "out", "none" // if not set: "out"
                closebuttoncolor="#fff"  // a color value (eg. "purple" or "rgba(0,0,0,0.5)"  // if not set: "rgba(255,255,255,0.7)"
                size="m" // "s", "m", "l", "xl" // if not set: 1100px
                backgroundcolor="#ededed" // a color value (eg. "#242424" or "transparent")  // if not set: "#fff"
                radius="8px" // a size value (eg. "4px" or "0.5rem") // if not set: "none"
                // options
                />
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.any,
}