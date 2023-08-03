import React from 'react'
import ModalLauncher from './ModalLauncher'
import { createRoot } from 'react-dom/client'

export const modalService = (content, options = {}) => {

    const domNode = document.createElement('div')
    const root = createRoot(domNode)
    document.body.appendChild(domNode)

    root.render(
        <ModalLauncher {...options}>
            {content}
        </ModalLauncher>
    )

}