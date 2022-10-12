import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-left: 0.5rem;
margin-right: 0.5rem;
cursor: pointer;
`

const Icone = styled.img`
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: 3px solid #F67280;
    background-color: white;
    padding: 2px;
    object-fit: cover;
`

const Description = styled.div`
color: #f2f2f2;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 1.1rem;
margin-top: 0.5rem;
margin: 8px;
font-weight: 600;
`

export default function Story({ name, icon, onClick, getStoryIndex, index }) {

    const handleStoriesClick = () => {
        onClick()
        getStoryIndex(index)
    }

    return (
        <Item onClick={handleStoriesClick}>
            <Icone src={`images/${icon}`} />
            <Description>
                {name}
            </Description>
        </Item>
    )
}
