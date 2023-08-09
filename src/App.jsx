import React, { useContext } from 'react'
import styled from "styled-components"
import { ModalContext } from './lib/ModalContext'
import ModalContentFirst from './components/ModalContentFirst'
import ModalContentSecond from './components/ModalContentSecond'

/**
 * Displays the App component.
 * @returns {JSX.Element} - The JSX markup for the App component.
 */
function App() {
    
    const { openModal } = useContext(ModalContext)
    const theme = { closebutton: "in", closebuttoncolor: "#af5f0c", size: "s", backgroundcolor: "#c7cd77", radius:"12px" }

    return (
        <Main>
            <h1 className="app_title">React Modal Classic</h1>
            <p>You can test the modal component, with 2 different contents:</p>
            <ButtonsWrapper>
                <Button onClick={() => openModal(<ModalContentFirst/>)} className="leaf">Open first modal</Button>
                <Button onClick={() => openModal(<ModalContentSecond/>, theme )} className="robin">Open second modal</Button>
            </ButtonsWrapper>
            <p>For more infos, see the <a href="https://www.npmjs.com/package/react-modal-classic" target="_blank" rel="noreferrer">NPM module</a> repository.</p>
        </Main>
    )
}

export default App

const Main = styled.main`
    text-align:center;
    & .app_title{
        font-size:28px;
        line-height:1.2;
        font-weight:900;
        color:#fff;
        margin:0 0 30px 0;
    }
    & p{
        margin:0;
        color:#888;
        & a{
            color:#fff;
            text-decoration:none;
            font-weight:700;
            border-bottom:1px solid transparent;
            transition:0.1s border-color ease-in-out;
            &:hover{
                border-bottom:1px solid #b97b3e;
                transition:0.1s border-color ease-in-out;
            }
        }
    }

`
const ButtonsWrapper = styled.div`
    display:flex;
    justify-content:center;
    padding: 30px 0;
`
const Button = styled.button`
    text-transform:uppercase;
    font-size:14px;
    line-height:1;
    padding:15px 20px;
    border-radius:5px;
    border:none;
    margin:0 10px;
    cursor:pointer;
    color:#fff;
    &.leaf{
        border:1px solid #95a938;
        background-color:rgba(76,89,13,0.6);
        transition:0.1s background-color ease-in-out;
        &:hover{
            background-color:rgba(76,89,13,1);
            transition:0.1s background-color ease-in-out;
        }
    }
    &.robin{
        border:1px solid #b97b3e;
        background-color:rgba(89,49,13,0.6);
        transition:0.1s background-color ease-in-out;
        &:hover{
            background-color:rgba(89,49,13,1);
            transition:0.1s background-color ease-in-out;
        }
    }
`