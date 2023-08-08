import React, { useState, useEffect, useCallback, createContext, useRef } from 'react'
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
    const closingTimeout = useRef(null)

    useEffect(() => {
        if(modalOpen){
            document.body.style.overflowY = "hidden"
            document.querySelector('main').setAttribute("aria-hidden", "true")
        } else {
            document.body.removeAttribute("style")
            document.querySelector('main').removeAttribute("aria-hidden")
        }
    }, [modalOpen])

    const openModal = (content, options = {}) => {
        // Merge default options with provided ones (if any)
        setModalOptions(prevOptions => ({
            ...prevOptions,
            ...options
        }))
        setModalOpen(true)
        // Clear any pre-existing closing timeout to ensure modals don't overlap or interfere with each other
        if (closingTimeout.current) clearTimeout(closingTimeout.current)
        setModalContent(content)
    }

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