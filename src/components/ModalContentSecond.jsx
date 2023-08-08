import React, { useContext } from 'react'
import { ModalContext } from '../lib/ModalContext'

function ModalContentSecond(){
    
    const { closeModal } = useContext(ModalContext)

    return (
        <div>
            <figure>
                <img src="john-mcmahon-robin.jpg" alt="image content"/>
                <figcaption>© John Mc Mahon</figcaption>
            </figure>
            <div className="modal-caption">
                <p>This is another modal, <br/>with custom styles options passed as props.<br/>
                    <button onClick={closeModal} className="close">Close</button>
                </p>
            </div>
        </div>
    )
}

export default ModalContentSecond