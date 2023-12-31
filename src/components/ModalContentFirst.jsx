import React, { useContext } from 'react'
import { ModalContext } from '../lib/ModalContext'

/**
 * Displays a test content component for a modal.
 * @returns {JSX.Element} - The JSX markup for the ModalContentFirst component.
 */
function ModalContentFirst(){
    
    const { closeModal } = useContext(ModalContext)

    return (
        <div>
            <figure>
                <img src="src/assets/tom-bradley-robin.jpg" alt="image content"/>
                <figcaption>© Tom Bradley</figcaption>
            </figure>
            <div className="modal-caption">
                <p>This React modal is based on a component <br/>and a context provider.<br/>
                    <button onClick={closeModal} className="close">Close</button>
                </p>
            </div>
        </div>
    )
}

export default ModalContentFirst