import React from 'react'
import styled from "styled-components"

function ModalContentText(){
    return (
        <>
            <Wrapper>
                <img src="image.jpg" alt="image content"/>
                <div className="caption">
                    <p>This modal is based on a component and a hook.</p>
                </div>
            </Wrapper>
        </>
    )
}

export default ModalContentText

const Wrapper = styled.div`
    & .caption{
        padding:15px;
        & p{
            font-size:17px;
            line-height:1.4;
            color:#333;
            margin:0;
            text-align:center;
        }
    }
`