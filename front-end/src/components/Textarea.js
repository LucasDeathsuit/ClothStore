import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-width: 90vw;
    `


const Label = styled.label`
        transition: all 0.3s;
        position: absolute;
        color: #c1c1c1;
        transform: translate(10px, 13px);
        padding: 0 2px;
        font-weight: 500;
        pointer-events: none;

`
const StyledTextarea = styled.textarea`
    background-color: #f2f2f2;
    outline: none;
    border: 2px solid #c1c1c1;
    border-radius: 5px;
    padding: 0.8rem 0.9rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;


    ::placeholder {
        opacity: 0;
        transition: all 0.3s;
    }

    :focus::placeholder {
        opacity: 100;
        color: #c1c1c1;
    }

    :focus {
        border: 2px solid #355c7d;
    }

    &:focus + ${Label} {
        transform: translate(0px, -20px);
        color: #355c7d;
    }

    &:not(:placeholder-shown) + ${Label} {
        color: #355c7d;
        transform: translate(0px, -20px);
    }
`

export default function Textarea({rows, cols, required, placeholder, value, name, onChange, label }) {

    return (
        <Wrapper>
            <StyledTextarea rows={rows} cols={cols} required={required} placeholder={placeholder} value={value} name={name} onChange={onChange} />
            <Label>{label}</Label>
        </Wrapper>
    )

}