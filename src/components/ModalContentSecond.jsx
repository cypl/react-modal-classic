import React, { useContext } from 'react'
import { ModalContext } from '../lib/ModalContext'
import ModalContentFirst from './ModalContentFirst'

/**
 * Displays a test content component for a modal.
 * @returns {JSX.Element} - The JSX markup for the ModalContentSecond component.
 */
function ModalContentSecond(){
    
    const { openModal } = useContext(ModalContext)

    return (
        <div>
            <figure>
                <img src="src/assets/john-mcmahon-robin.jpg" alt="image content"/>
                <figcaption>© John Mc Mahon</figcaption>
            </figure>
            <div className="modal-caption">
                <p>This is another modal, <br/>with custom styles options passed as props.<br/>
                    <button onClick={() => openModal(<ModalContentFirst/>)} className="close">Test open another modal</button>
                </p>
            </div>
        </div>
    )
}

export default ModalContentSecond