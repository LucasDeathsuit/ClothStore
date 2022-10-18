import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getClothesFirstImage } from "./APIServices/APIServices";
import ClothItem from "./ClothItem";
import Input from "./Input";
import styled from 'styled-components'

const FilteredWrapper = styled.div`
    position: absolute;
    top: 90px; right: 0; bottom: 0;
    margin: 10px;
    flex-grow: 2;
    flex: 0 0 50%;
    overflow-y: hidden;

    @media (max-width: 1000px) {
        position: relative;    
        top: 0;
    }
`

const ItemsWrapper = styled.div`
    margin-top: 10px;
    font-weight: 400;
    height: 90%;
    padding: 5px;
    overflow-y: auto;
    min-width: 750px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);   
        min-width: unset;
    }

    @media (max-width: 1000px) {
        max-height: 500px;
        min-width: unset;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #355c7d;
        border-radius: 10px;
    }
`

const Icon = styled.img`
    height: 100px;
    width: 100px;
    min-width: 100px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 100% 0%;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    border: 2px solid #355c7d;
    border-radius: 5px;
    padding: 10px 5px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
`
const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5px;
`

const Clothes = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        display: flex;
        flex-wrap: wrap;
    }
    
`

const Name = styled.h3``

const Description = styled.p``

const Price = styled.p``

const Type = styled.p``

export default function Filtered({ items, clothes, onClick }) {

    const [filter, setFilter] = useState('')

    const addDefaultImage = (e) => {
        e.target.src = './images/MissingClothImage.png'
    }

    return (
        <FilteredWrapper>
            <Input label="Filter" type="text" name="filter" items={items} placeholder="Type to filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <ItemsWrapper>
                <Clothes>
                    {
                        clothes ?
                            clothes.filter(cloth => cloth.name.toUpperCase().includes(filter.toUpperCase()))
                                .map((cloth) => {
                                    return (
                                        <Wrapper key={cloth.id} onClick={() => onClick(cloth)}>
                                            <Icon onError={addDefaultImage} src={`http://localhost:13233/ClothStore/cloth-images${cloth.imageURL}`} />
                                            <DetailsWrapper>
                                                <Name>{cloth.name}</Name>
                                                <Description>{cloth.description}</Description>
                                                <Price>R$ {cloth.price}</Price>
                                                <Type>{cloth.type}</Type>
                                            </DetailsWrapper>
                                        </Wrapper>
                                    )
                                }) :
                            null
                    }
                </Clothes>
            </ItemsWrapper>
        </FilteredWrapper >
    )

}