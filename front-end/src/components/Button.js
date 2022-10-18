import React from 'react'
import styled from 'styled-components'

const STYLES = ['btn--primary', 'btn--secondary', 'btn--outline', 'btn--caution'];

const SIZES = ['btn--medium', 'btn--large', 'btn--small'];



const Item = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        border-radius: 4px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, Geneva, Tahoma, sans-serif;
        font-weight: 600;
        color: #fff;
        background-color: #F67280;
        transition: all 0.3s ease-out;
        cursor: pointer;

            :hover {
                background-color: #355C7D;
            }
        

        &.btn--primary {
            color: #fff;
            background-color: #F67280;
            transition: all 0.3s ease-out;

            :hover {
                background-color: #355C7D;
            }
        }

        &.btn--secondary {
            color: #fff;
            background-color: #355c7D;
            transition: all 0.3s ease-out;

            :hover {
                background-color: #F67280;
            }
        }

        &.btn--outline {
            color: #f2f2f2;
            background-color: transparent;
            border: 1px solid #f2f2f2;

            :hover {
                background-color: #F67280;
                color: #fff;
                border: 1px solid #F67280;
            }
        }

        &.btn--caution {
            color: #ffffff;
            background-color: #f90000;
            border: 1px solid #f2f2f2;

            :hover {
                background-color: #ffffff;
                color: #f90000;
                border: 1px solid #f90000;
            }
        }

        &.btn--small {
            padding: 10px 16px;
            font-size: 1rem;
            width: 120px;
        }

        &.btn--medium {
            padding: 12px 18px;
            font-size: 1.2rem;
        }

        &.btn--large {
            padding: 12px 5px;
            font-size: 1.2rem;
            width: 100%;
        }

        &.btn--shadowed {
            box-shadow: 0px 2px 5px 1px #34343490;
        }
    `

export default function Button({ onClick, shadow, type, size, className, children }) {

    const checkButtonStyle = STYLES.includes(type) ? type : STYLES[0];

    const checkButtonSize = SIZES.includes(size) ? size : SIZES[0];

    return (
        <>
            <Item onClick={onClick} className={`${shadow && "btn--shadowed"} ${checkButtonStyle} ${checkButtonSize} ${className}`}>{children}</Item>
        </>
    )
}
