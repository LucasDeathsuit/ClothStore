import React, { useEffect } from 'react'
import styled from 'styled-components';
import Hero from '../Hero';
import Navbar from '../Navbar';
import Promo from '../Promo';
import Stories from '../Stories';
import CommentSection from '../CommentSection';
import Footer from '../Footer';

const HeroWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('images/hero-background.jpg');
`

const StoriesWrapper = styled.div`
  background-color: #355c7d;
  box-shadow: inset 0px 0px 20px 3px rgba(0, 0, 0, 0.8);
`

const PromoWrapper = styled.div`

  
  @media (max-width: 800px) {
      padding: 10px 0;
    }
`


const CommentSectionWrapper = styled.div`
  position: relative;
  box-shadow: 0px 0px 8px 0px;
  background-image: url('images/Prancheta 3.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  display: flex;
  padding: 80px;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 55px;
  }
`

export default function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Navbar />
      <HeroWrapper>
        <Hero />
      </HeroWrapper>
      <StoriesWrapper>
        <Stories />
      </StoriesWrapper>
      <Promo />

      <CommentSectionWrapper>
        <CommentSection quantity={3} />
      </CommentSectionWrapper>

      <Footer />
    </>
  )
}