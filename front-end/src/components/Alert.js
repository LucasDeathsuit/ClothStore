import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: absolute;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;

    &.success {
        background-color: #28a745;
    }

    &.failure {
        background-color: #dc3545;
    }

    &.warning {
        background-color: #ffc107;
    }
`

const Message = styled.div``

export default function Alert({ type, message }) {

    const TYPES = ["success", "failure", "warning"]

    const checkAlertType = TYPES.includes(type) ? type : TYPES[0]

    return (
        <Wrapper className={checkAlertType}>
            <Message>
                {message}
            </Message>
        </Wrapper>
    )
}