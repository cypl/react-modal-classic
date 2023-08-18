import React, { useState, useEffect, useCallback, createContext, useRef } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

export const ModalContext = createContext()

// Here are the default options for the Modal component 
const defaultOptions = {
    closeButton: "out",
    closeButtonColor: "#fff",
    size: "m",
    backgroundColor: "#fff",
    radius: "6px"
}

export const ModalProvider = ({ children }) => {
    
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState()
    const [animeOut, setAnimeOut] = useState(false)
    const [modalOptions, setModalOptions] = useState(defaultOptions)
    const closingTimeout = useRef(null)

    // Control body scroll and <main> aria-hidden attribute, based on modalOpen state
    useEffect(() => {
        if(modalOpen){
            document.body.style.overflowY = "hidden"
            document.querySelector('main') && document.querySelector('main').setAttribute("aria-hidden", "true")
        } else {
            document.body.style.overflowY = "auto"
            document.querySelector('main') && document.querySelector('main').removeAttribute("aria-hidden")
        }
    }, [modalOpen])

    /**
     * Opens the modal with the specified content and options.
     * 
     * @param {React.ReactNode} content - The content to be displayed inside the modal.
     * @param {Object} [options={}] - Custom modal configuration options.
     * @param {string} [options.closeButton="out"] - Position of the close button ("out", "in" or "none").
     * @param {string} [options.closeButtonColor="#fff"] - Color of the close button.
     * @param {string} [options.size="md"] - Size of the modal ("sm", "md", "lg", "xl").
     * @param {string} [options.backgroundColor="#fff"] - Background color of the modal.
     * @param {string} [options.radius="6px"] - Border radius of the modal.
     */
    const openModal = (content, options = null) => {
        // Merge default options with provided ones (if any)
        setModalOptions(prevOptions => ({
            ...prevOptions,
            ...options ?? defaultOptions
        }))
        setModalOpen(true)
        // Clear any pre-existing closing timeout to ensure modals don't overlap or interfere with each other
        if (closingTimeout.current) clearTimeout(closingTimeout.current)
        closingTimeout.current = null
        setModalContent(content)
    }

    /**
     * Closes the modal with a closing animation.
     * Ensures the modal's state is reset after the animation.
     */
    const closeModal = useCallback(() => {
        // If the closing timeout is still running, don't do anything
        if (closingTimeout.current) return
        setAnimeOut(true)
        // Schedule the modal's state reset after the animation duration (600ms)
        closingTimeout.current = setTimeout(() => {
            setModalOpen(false)
            setModalContent()
            setModalOptions(defaultOptions)
            setAnimeOut(false)
            closingTimeout.current = null
        }, 600) // 600ms is the duration of the closing animation
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