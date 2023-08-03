import React from 'react'
import { useEffect } from "react"
import PropTypes from 'prop-types'
import Modal from './Modal'
import { useModal } from './useModal'

function ModalLauncher({ children, ...props }){

    const { modalOpen, openModal, animeOut, closeModal } = useModal()

    useEffect(() => {
        openModal()
    }, [openModal])

    const content = typeof children === 'function' ? children(closeModal) : children

    return (
        <Modal 
            modalOpen={modalOpen} 
            closeModal={closeModal}
            animeOut={animeOut}
            {...props} // here are the options props of the modal
        >
            {content}
        </Modal>
    )
}
export default ModalLauncher

ModalLauncher.propTypes = {
    children: PropTypes.any,
}