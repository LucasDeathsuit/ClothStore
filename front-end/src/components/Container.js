import React from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
    
    

    @media (max-width: 600px) {
        margin: 0 5px;
    }
`

export default function Container({ children }) {



    return (
        <ContainerDiv>
            {children}
        </ContainerDiv>
    )
}