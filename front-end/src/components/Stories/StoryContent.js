import { Link } from "@reach/router";
import React from "react";
import styled from "styled-components";


const ContentBox = styled.div`
    display: flex;
    border-radius: 20px;
    aspect-ratio: 9/16;
    width: 100%;
    height: 92%;
    transform: scale(0.5);
    z-index: -1;
`

const Content = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
    background-color: #F67280;
    border-radius: 20px;
    cursor: pointer;
    
`

const ContentNav = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    width: 100%;
    background: linear-gradient(180deg,rgba(38,38,38,.8) 0%,rgba(38,38,38,0) 100%);
    border-radius: 20px 20px 0px 0px;
    padding-top: 20px;
    padding-left: 15px;
    padding-bottom: 10%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.2rem;
`

const ClothType = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 100%;
    border: 2px solid #f2f2f2;
`

const ContentBottom = styled.div`
`

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s;
    border: 2px solid transparent;

    :hover {
        color: #5f7f9f;
    }
`

export default function StoryContent({ imagePath, name, type }) {



    return (



        <ContentBox>
            {imagePath === "null" ?
                null :
                <>
                    <Content src={imagePath ? `http://localhost:13233/ClothStore/cloth-images${imagePath}` : './images/MissingClothImage.png'} />
                    <ContentNav>
                        <StyledLink to={`./${name.toLowerCase()}`}>
                            <ClothType alt={name} src={imagePath ? `http://localhost:13233/ClothStore/cloth-images${imagePath}` : './images/MissingClothImage.png'} />
                            {type}
                        </StyledLink>
                    </ContentNav>
                    <ContentBottom>

                    </ContentBottom>
                </>
            }
        </ContentBox >
    )
}