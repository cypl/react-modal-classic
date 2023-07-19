import React from 'react'
// import Modal from './lib'
// import { useModal } from './lib'
import { Modal, useModal } from './lib'

const App = () => {
    
    const { modalOpen, openModal, closeModal } = useModal()
    
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <Modal modalOpen={modalOpen} closeModal={closeModal}>
                <p>Here is the content of the modal.</p>
            </Modal>
        </>
    )
}

export default App