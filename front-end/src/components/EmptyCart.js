import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "@reach/router";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const CartImage = styled.img`
    max-width: 500px;
    width: 100%;
    max-height: calc(100vh - 250px);
`
const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin: 2rem;
    margin-top: -10%;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

export default function EmptyCart() {

    return (
        <Wrapper>
            <CartImage src="images/emptyCart.png" />
            <Title>You Cart Is Empty</Title>
            <StyledLink to='/fashion-store/'>
                <Button type="btn--primary">Continue Shopping</Button>
            </StyledLink>
        </Wrapper>
    )

}