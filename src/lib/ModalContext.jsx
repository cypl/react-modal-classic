import React, { useState, useCallback, createContext } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    
    const defaultOptions = {
        closebutton: "out",
        closebuttoncolor: "#fff",
        size: "m",
        backgroundcolor: "#fff",
        radius: "6px"
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState()
    const [animeOut, setAnimeOut] = useState(false)
    const [modalOptions, setModalOptions] = useState(defaultOptions)

    const openModal = (content, options = {}) => {
        document.getElementsByTagName('html')[0].style.overflowY = "hidden"
        document.getElementsByTagName('main')[0].setAttribute("aria-hidden", "true")
        // Merge default options with provided ones (if any)
        setModalOptions(prevOptions => ({
            ...prevOptions,
            ...options
        }))
        setModalOpen(true)
        setModalContent(content)
    }

    const closeModal = useCallback(() => {
        document.getElementsByTagName('html')[0].removeAttribute("style")
        document.getElementsByTagName('main')[0].removeAttribute("aria-hidden")
        setAnimeOut(true)
        setTimeout(() => {
            setModalOpen(false)
            setModalContent()
            setModalOptions(defaultOptions)
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
                {...modalOptions}
            />
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.any,
}