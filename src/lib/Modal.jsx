import React from 'react'
import { useEffect } from "react"
import styled, { keyframes }from "styled-components"
import PropTypes from 'prop-types'

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }  
    100% {
        opacity: 1;
    }
`
const fadeOut = keyframes`
    0% {
        opacity: 1;
    }  
    100% {
        opacity: 0;
    }
`
const popIn = keyframes`
    0% {
        opacity: 0;
        transform:translateY(25px);
    }
    100% {
        opacity: 1;
        transform:translateY(0px);
    }
`
const popOut = keyframes`
    0% {
        opacity: 1;
        transform:translateY(0px);
    }
    100% {
        opacity: 0;
        transform:translateY(25px);
    }
`
const Overlay = styled.div`
    position:fixed;
    width:100vw;
    height:100vh;
    z-index:9999;
    top:0;
    left:0;
    overflow:auto;
`
const Background = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    position:absolute;
    width:100%;
    min-height:100%;
    background-color: rgba(0, 0, 0, 0.85);
    animation-name: ${fadeIn};
    animation-duration: 0.05s; 
    animation-timing-function: linear; 
    animation-delay: 0s; 
    animation-iteration-count: 1; 
    animation-fill-mode: forwards;
    animation-direction:normal;
    &.anime-out{
        animation-name: ${fadeOut};
        animation-duration: 0.05s; 
        animation-delay: 0.4s; 
    }
`
const ModalContent = styled.div`
    position:relative;
    max-width:calc(100% - 80px);
    margin:50px 0;
    min-height:${props => props.$closebutton === "in" ? "45px" : "none"};
    width: ${props => sizeValues[props.size] || "1100px"};
    opacity:0;
    animation-name: ${popIn}; 
    animation-duration: 0.05s; 
    animation-timing-function: ease-in-out; 
    animation-delay: 0.35s; 
    animation-iteration-count: 1; 
    animation-fill-mode: forwards;
    animation-direction:normal;
    &.anime-out{
        animation-name: ${popOut};
        animation-duration: 0.05s; 
        animation-delay: 0s; 
    }
`
const ModalContentBackground = styled.div`
    box-shadow:0 0 60px #000;
    position:absolute;
    top:0;
    width:100%;
    height:100%;
`
const ModalContentInner = styled.div`
    position:relative;
    overflow:hidden;
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
    z-index:1;
    & svg{
        width:25px;
        height:25px;
        color:${props => props.$closebutton === "in" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)"};
    }
`
const CloserBackground = styled.div`
    position:absolute;    
    height:100%;
    width:100%;
`
const sizeValues = {
    s: "350px",
    m: "500px",
    l: "750px",
    xl: "900px",
}

function Modal({ 
    modalOpen, 
    animeOut, 
    closeModal, 
    closebutton, 
    closebuttoncolor, 
    size, 
    backgroundcolor, 
    radius, 
    modalContent }){
    
    // close Modal on keyboard escape
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') { closeModal() }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => { document.removeEventListener('keydown', handleKeyDown) }
    }, [])

    return(
        <>
            {modalOpen && modalContent &&
                <Overlay role="dialog" aria-modal="true" aria-hidden="false">
                    <Background className={animeOut ? 'anime-out' : ''}>
                        <CloserBackground onClick={() => closeModal()}></CloserBackground>
                        <ModalContent $closebutton={closebutton} size={size} className={animeOut ? 'anime-out' : ''}>
                            <ModalContentBackground style={{backgroundColor : `${backgroundcolor}`, borderRadius:`${radius}`}}>
                                {closebutton != "none" && 
                                    <CloseModal onClick={() => closeModal()} $closebutton={closebutton}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{color:`${(closebuttoncolor != undefined) ? `${closebuttoncolor}` : `rgba(255,255,255,0.7)`}`}} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                    </CloseModal>
                                }
                            </ModalContentBackground>
                            <ModalContentInner style={{borderRadius:`${(radius != undefined) ? `${radius}` : `none`}`}}>
                                {modalContent}
                            </ModalContentInner>
                        </ModalContent>
                    </Background>
                </Overlay>
            }
        </>
    )
}

export default Modal

Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    animeOut: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    closebutton: PropTypes.string,
    closebuttoncolor: PropTypes.string,
    size: PropTypes.oneOf(["s", "m", "l", "xl"]),
    backgroundcolor: PropTypes.string,
    radius: PropTypes.string,
    modalContent: PropTypes.any,
}