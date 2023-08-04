import React, { useContext } from 'react'
import styled from "styled-components"
import { ModalContext } from './lib/ModalContext'
import ModalContentFirst from './ModalContentFirst'
import ModalContentSecond from './ModalContentSecond'

const App = () => {
    
    const { openModal } = useContext(ModalContext)

    return (
        <main>
            <Button onClick={() => openModal(<ModalContentFirst/>)} className="normal">Open modal</Button>
            <Button onClick={() => openModal(<ModalContentSecond/>, { closebutton: "in", size: "l" })} className="function">Open modal with function</Button>
        </main>
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