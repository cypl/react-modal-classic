import React, { useState, useEffect, useCallback, createContext, useRef } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

export const ModalContext = createContext()

// Here are the default options for the Modal component 
const defaultOptions = {
    closeButton: "out",
    closeButtonColor: "#fff",
    size: "md",
    backgroundColor: "#fff",
    radius: "6px"
}

export const ModalProvider = ({ children }) => {
    
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState()
    const [animeOut, setAnimeOut] = useState(false)
    const [modalOptions, setModalOptions] = useState(defaultOptions)
    const [onClose, setOnClose] = useState(() => () => {})
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
     * @param {Function} onCloseCallback - A callback function that is executed when the modal is closed. 
     *                                     This function is optional and can be used to perform any 
     *                                     cleanup or follow-up actions after the modal is closed.
     * @param {Object} [options={}] - Custom modal configuration options.
     * @param {string} [options.closeButton="out"] - Position of the close button ("out", "in" or "none").
     * @param {string} [options.closeButtonColor="#fff"] - Color of the close button.
     * @param {string} [options.size="md"] - Size of the modal ("sm", "md", "lg", "xl").
     * @param {string} [options.backgroundColor="#fff"] - Background color of the modal.
     * @param {string} [options.radius="6px"] - Border radius of the modal.
     */
    const openModal = (content, arg2 = () => {}, arg3 = null) => {
        let onCloseCallback = () => {};
        let options = null;
        // Add a type verification, in case function is used without arg2 or arg3
        if (typeof arg2 === 'function') {
            onCloseCallback = arg2;
            options = arg3;
        } else if (typeof arg2 === 'object') {
            options = arg2;
        }
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
        setOnClose(() => onCloseCallback)
    }

    /**
     * Closes the modal with a closing animation.
     * Ensures the modal's state is reset after the animation.
     */
    const closeModal = useCallback(() => {
        onClose()
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
    }, [onClose])

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