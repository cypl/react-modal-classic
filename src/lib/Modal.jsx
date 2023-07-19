import React from 'react'
import { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import PropTypes from 'prop-types'

function Modal({modalOpen, closeModal, children}){

    const [viewportHeight, setViewportHeight] = useState("auto")
    const [modalHeight, setModalHeight] = useState("auto")
    const modalRef = useRef(null)

    // Calculate viewport height
    useEffect(() => {
        modalOpen && setViewportHeight(window.innerHeight) // Au chargement de la page
        const handleResize = () => { setViewportHeight(window.innerHeight) } // Lors du redimensionnement de la fenêtre
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
      }, [modalOpen])

    // Calculate Modal height
    const calculateModalHeight = () => {
        modalRef.current && setModalHeight(modalRef.current.scrollHeight + 100)
    }
    useEffect(() => {
        calculateModalHeight() // Au chargement de la page
        const handleResize = () => { calculateModalHeight() } // Lors du redimensionnement de la fenêtre
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [modalOpen])

    return(<>
        {modalOpen && 
            <Overlay className={(viewportHeight >= modalHeight) && 'aligncenter'}> 
                <Background 
                    onClick={closeModal}
                    style={{ height: `${(viewportHeight < modalHeight) ? `${modalHeight}px` : '100%'}` }}
                >
                </Background>
                <ModalContent ref={modalRef}>
                    {children}
                </ModalContent>
            </Overlay>
        }
        </>
    )
}

export default Modal

Modal.propTypes = {
    modalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    children: PropTypes.any,
}

const Overlay = styled.div`
    position:fixed;
    width:100vw;
    height:100vh;
    z-index:9999;
    top:0;
    left:0;
    display:flex;
    justify-content: center;
    overflow:auto;
    &.aligncenter{
        align-items:center;
    }
`
const Background = styled.div`
    position:absolute;
    width:100%;
    background-color: rgba(0, 0, 0, 0.85);
`
const ModalContent = styled.div`
    position:relative;
    max-width:1200px;
    margin:50px 0;
    width:80%;
    background-color:#fff;
    color:#000;
    border-radius:4px;
    overflow:hidden;
`