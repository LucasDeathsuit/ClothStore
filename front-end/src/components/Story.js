import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
display: flex;
flex: 1;
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
text-align: center;
`

export default function Story({ index, onClick, getStoryIndex, cloth }) {

    const handleStoriesClick = () => {
        onClick()
        getStoryIndex(index)
    }

    const addDefaultImage = (e) => {
        e.target.src = './images/MissingClothImage.png'
    }

    return (
        <Item onClick={handleStoriesClick}>
            <Icone onError={addDefaultImage} src={cloth.imageURL ? `http://localhost:13233/ClothStore/cloth-images${cloth.imageURL}` : './images/MissingClothImage.png'} />
            <Description>
                {cloth.type}
            </Description>
        </Item>
    )
}
