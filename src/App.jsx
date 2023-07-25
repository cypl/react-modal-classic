import React from 'react'
import { Modal, useModal } from './lib'

const App = () => {
    
    const { modalOpen, openModal, animeOut, closeModal } = useModal()
    
    return (
        <>
            <button onClick={(openModal)}>Open modal</button>

            <Modal 
                modalOpen={modalOpen} 
                closeModal={closeModal} 
                closebutton="in"
                size="m"
                animeOut={animeOut}
                >
                <p>Here is the content of the modal.</p>
                <p onClick={closeModal}>Close this modal</p>
            </Modal>
        </>
    )
}

export default App