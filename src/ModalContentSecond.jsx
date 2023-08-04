import { React, useContext } from 'react'
import { ModalContext } from './lib/ModalContext'

function ModalContentSecond(){
    
    const { closeModal } = useContext(ModalContext)

    return (
        <div>
            <figure>
                <img src="Roux-Fontaine_Anima-Mundi.jpg" alt="image content"/>
                <figcaption>© Roux-Fontaine “Anima Mundi”</figcaption>
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