import styled from 'styled-components'
import React from 'react'

const LogoWrapper = styled.div`
max-width: 250px;
max-height: 250px;
margin-left: auto;
margin-right: auto;
`

const Logo = styled.img`
    width: 100%;
    display: block;
    border-radius: 50%;
`

export default function Hero() {
    return (
        <LogoWrapper>
            <Logo src='images/Logo.png'/>
        </LogoWrapper>
    )
}
