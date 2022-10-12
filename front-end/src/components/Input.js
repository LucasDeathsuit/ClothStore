import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
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

const StyledInput = styled.input`
    
        background-color: #fff;
        border: 2px solid #c1c1c1;
        border-width: ${props => props.disabled ? "0 0 2px 0" : "2px"} ;
        border-style: solid;
        border-color: #c1c1c1;
        border-radius: ${props => props.disabled ? "0px" : "5px"};
        padding: 0.8rem 0.9rem;
        outline: none;
        

        :focus {
            border: 2px solid #355c7d;
        }

        &:focus + ${Label} {
            transform: translate(3px, -19px);
            color: #355c7d;
        }

        &:not(:placeholder-shown) + ${Label} {
            color: #355c7d;
            transform: translate(3px, -19px);
        }
        
        ::placeholder {
            opacity: 0;
            color: #c1c1c1;
            transition: all 0.3s;
        }

        :focus::placeholder {
            opacity: 100;
        }

    `


export default function Input({ autoComplete, type, required, placeholder, value, name, onChange, label, readOnly, disabled }) {

    return (
        <Wrapper>
            <StyledInput autoComplete={autoComplete} type={type} required={required} placeholder={placeholder} readOnly={readOnly} disabled={disabled} value={value} name={name} onChange={onChange} />
            <Label>{label}</Label>
        </Wrapper>
    )

}