import React from 'react'
import { Modal, useModal } from './lib'
import { createRoot } from 'react-dom/client'
import styled from "styled-components"
import ModalContentText from './ModalContentText'

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
                    animeOut={animeOut}
                    // options
                    closebutton="in" // "in", "out", "none" // if not set: "out"
                    closebuttoncolor="#fff"  // a color value (eg. "purple" or "rgba(0,0,0,0.5)"  // if not set: "rgba(255,255,255,0.7)"
                    size="l" // "s", "m", "l", "xl" // if not set: 1100px
                    backgroundcolor="#ededed" // a color value (eg. "#242424" or "transparent")  // if not set: "#fff"
                    radius="8px" // a size value (eg. "4px" or "0.5rem") // if not set: "none"
                >
                    <ModalContentText />
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