import { React, useContext } from 'react'
import { ModalContext } from './lib/ModalContext'

function ModalContentFirst(){
    
    const { closeModal } = useContext(ModalContext)

    return (
        <div>
            <figure>
                <img src="Jacquet_Une-Soiree-Ordinaire.jpg" alt="image content"/>
                <figcaption>© Jacquet “Un soirée ordinaire”</figcaption>
            </figure>
            <div className="modal-caption">
                <p>This modal is based on a component and a hook.<br/>
                    <button onClick={closeModal} className="close">Close</button>
                </p>
            </div>
        </div>
    )
}

export default ModalContentFirst