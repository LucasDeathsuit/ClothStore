import React, { useState } from 'react'
import styled from 'styled-components'

const CartContainer = styled.div`
    display: grid;
    grid-template-columns: auto 180px auto auto 100px;
    align-items: center;
    gap: 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 1rem;
    padding: 20px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 350px) {
        display: flex;
        flex-direction: column;
    }
`

const Picture = styled.img`
    height: 85px;
    width: 85px;
    object-fit: cover;

    @media (max-width: 700px) {

    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    @media (max-width: 700px) {
        grid-column: 2/4;
    }
`

const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
`

const Subtitle = styled.p`
    font-size: 0.7rem;
`

const Select = styled.select`
    border: none;
    background-color: #dfdfdf;
    padding: 8px;
    border-radius: 3px;
    outline: none;
`

const Quantity = styled.div`
    display: grid;
    grid-template-columns: repeat(3,50px);

    @media (max-width: 700px) {
    }
`

const Button = styled.button`
    padding: 14px;
    border: none;
    cursor: pointer;
    border-radius: 3px;

    &.plus {
        background-color: #355c7d;
        color: #fff;
    }

    &.less {
        background-color: #d1d1d1;
    }
`

const Value = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #dfdfdf;
    border-radius: 3px;
`

const Price = styled.div`

    font-weight: 600;
    @media (max-width: 700px) {
    }
`

export default function CartItem({ index, onChange, item }) {

    const { amount, title, iconPath, price, sizes } = item;

    const [quantity, setQuantity] = useState(1)


    const handleQuantityChange = (value) => {
        const newValue = quantity + value;
        if (newValue > 0) {
            setQuantity(newValue);
            onChange(newValue, index);
        } else if (newValue === 0) {
            onChange(newValue, index);
        }
    }

    return (
        <CartContainer>
            <Picture src={`images/${iconPath}`} />
            <Description>
                <Title>
                    {title}
                </Title>
                <Subtitle>
                    Valor Único: R${price}
                </Subtitle>
            </Description>
            {
                sizes &&
                <Select>
                    {
                        sizes.map(option => {
                            return <option key={option} value={option}>{option}</option>
                        })}
                </Select>
            }
            <Quantity>
                <Button className='plus' onClick={() => handleQuantityChange(1)}>+</Button>
                <Value>{quantity}</Value>
                <Button className='less' onClick={() => handleQuantityChange(-1)}> - </Button>
            </Quantity>
            <Price>R${(quantity * price).toFixed(2)}</Price>
        </CartContainer>
    )
}