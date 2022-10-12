import React from 'react'
import styled from 'styled-components'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const SocialMedia = styled.div`
        display: flex;
        justify-content: center;
        color: #f2f2f2;
        gap: 8px;
    `
    const Icon = styled.div`
        border: 2px solid #f2f2f2;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        :hover {
            color: #1a1e65;
            border: 2px solid #1a1e65
        }
    `
    const FooterContent = styled.div`
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        padding-bottom: 30px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 0.8rem;
        color: #f2f2f2;
        background-color: #355c7d;
        padding-top: 40px;
    `

    const Anchor = styled.a`
        color: #f2f2f2;
	    text-decoration: none;

        :hover {
            color: #1a1e65;
        }
    `

export default function Footer() {

    

    return (
        <FooterContent>
            <SocialMedia>
                <Icon>
                    <TwitterIcon />
                </Icon>
                <Icon>
                    <FacebookIcon />
                </Icon>
                <Icon>
                    <WhatsAppIcon />
                </Icon>
            </SocialMedia>
            <Anchor target='_blank' href='https://twitter.com/lucasdeathsuit'>@LucasDeathsuit</Anchor>
        </FooterContent>
    )
}