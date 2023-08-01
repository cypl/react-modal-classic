import React from 'react'
import { Modal, useModal } from './lib'
import { createRoot } from 'react-dom/client'
// import { modalService } from './lib/ModalService'
import styled from "styled-components"

const App = () => {
    
    const { modalOpen, openModal, animeOut, closeModal } = useModal()
    
    const loadModal = () => {
        const ComposantTest = () => {
            return (
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
            )
        }
        const domNode = document.createElement('div')
        const root = createRoot(domNode)
        root.render(<ComposantTest />)
        document.body.appendChild(domNode)
        openModal()
    }

    return (
        <>
            <main>

                <Button onClick={openModal} className="normal">Open modal</Button>
                <Button onClick={loadModal} className="function">Open modal with function</Button>
                
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
            </main>
        </>
    )
}

export default App

const Button = styled.button`
    text-transform:uppercase;
    font-size:14px;
    line-height:1;
    padding:15px 20px;
    border-radius:4px;
    border:none;
    margin:0 10px;
    cursor:pointer;
    color:#fff;
    &.normal{
        color:#072817;
        background-color:#00c35e;
        transition:0.1s background-color ease-in-out;
        &:hover{
            background-color:#157845;
            transition:0.1s background-color ease-in-out;
        }
    }
    &.function{
        color:#282023;
        background-color:#dc95ae;
        transition:0.1s background-color ease-in-out;
        &:hover{
            background-color:#90576b;
            transition:0.1s background-color ease-in-out;
        }
    }
`