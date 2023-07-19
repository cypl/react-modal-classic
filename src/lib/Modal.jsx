import React from 'react'
import { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import PropTypes from 'prop-types'

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
    max-width:calc(100% - 40px);
    margin:50px 0;
    min-height:${props => props.$closebutton === "in" ? "45px" : "none"};
    width: ${props => sizeValues[props.size] || "1100px"};
    background-color:#fff;
    color:#000;
    border-radius:4px;
`
const CloseModal = styled.div`
    position:absolute;
    width:25px;
    height:25px;
    top: ${props => props.$closebutton === "in" ? "10px" : "-30px"};
    right: ${props => props.$closebutton === "in" ? "10px" : "-30px"};
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    & svg{
        width:25px;
        height:25px;
        color:${props => props.$closebutton === "in" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)"};
    }
`

const sizeValues = {
    s: "350px",
    m: "500px",
    l: "750px",
    xl: "900px",
}

function Modal({ modalOpen, closeModal, closebutton, size, children }){
    
    const [viewportHeight, setViewportHeight] = useState("auto")
    const [modalHeight, setModalHeight] = useState("auto")
    const modalRef = useRef(null)

    // Scroll management based on modal size.
    // Calculate viewport height
    useEffect(() => {
        modalOpen && setViewportHeight(window.innerHeight) // On page load
        const handleResize = () => { setViewportHeight(window.innerHeight) } // On page resize
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
        calculateModalHeight() // On page load
        const handleResize = () => { calculateModalHeight() } // On page resize
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
                <ModalContent ref={modalRef} $closebutton={closebutton} size={size}>
                    {closebutton != "none" && 
                        <CloseModal onClick={closeModal} $closebutton={closebutton}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </CloseModal>
                    }
                    {children}
                </ModalContent>
            </Overlay>
        }
        </>
    )
}

export default Modal

Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    closebutton: PropTypes.string,
    size: PropTypes.oneOf(["s", "m", "l", "xl"]),
    children: PropTypes.any.isRequired,
}

