import React from 'react'
import { Modal, useModal } from './lib'
import styled from "styled-components"
import ModalContentText from './ModalContentText'
import { modalService } from './lib/ModalService'

const App = () => {
    
    const { modalOpen, openModal, animeOut, closeModal } = useModal()
    
    return (
        <>
            <main>

                <Button onClick={openModal} className="normal">Open modal</Button>
                <Button onClick={() => modalService(<ModalContentText />,
                    {
                        closebutton: "out",
                        size: "s",
                        radius: "12px",
                    }
                )} className="function">Open modal with function</Button>
                
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