import React, { useEffect, useState } from 'react'
import Story from './Story'
import StoryView from './Stories/StoryView';
import styled from 'styled-components'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useRef } from 'react';
import { getClothes, getClothesByType, getClothesTypes, getStoriesData } from './APIServices/APIServices';

const StoriesWrapper = styled.div`
overflow: hidden;
`

const StoryViewWrapper = styled.div`
  position: fixed;
  display: block;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
`

const TopItem = styled.div`
display: flex;
justify-content: flex-start;
object-fit: cover;
overflow: auto;
overflow: -moz-scrollbars-none;
-ms-overflow-style: none;
scroll-behavior: smooth;
margin-top: 1rem;
margin-bottom: 1rem;
width: 100%;
justify-content: space-between;

::-webkit-scrollbar {
    display: none;
    
}


@media (min-width: 1024px) {
    width: 100%;
    justify-content: space-around;
    margin-top: 2rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
}
`

const LeftArrow = styled.div`
    display: flex;
    position: absolute;
    left: 0px;
    color: white;
    height: 66px;
    justify-content: center;
    align-items: center;

    :hover {
        cursor: pointer
    }
`
const RightArrow = styled.div`
    display: flex;
    position: absolute;
    right: 5px;
    color: white;
    height: 66px;
    justify-content: center;
    align-items: center;

    :hover {
        cursor: pointer
    }
`


export default function Stories() {

    const [scrollLeft, setScrollLeft] = useState(0);

    const [windowSize, setWindowSize] = useState(0);

    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const [showRightArrow, setShowRightArrow] = useState(false);

    const [showStoryView, setShowStoryView] = useState(false);

    const [storyIndex, setStoryIndex] = useState("");

    const [data, setData] = useState([])


    // 


    const refStories = useRef(null)

    const handleStoriesClick = () => {
        setShowStoryView(true);
    }

    const handleCloseStoriesClick = () => {
        setShowStoryView(false);
    }

    const handleArrowClick = (scrollOffset) => {
        const newScrollLeft = refStories.current.scrollLeft + scrollOffset
        setScrollLeft(newScrollLeft);
    }

    const handleResize = () => {
        setWindowSize(window.innerWidth);
    }


    const handleStoriesScroll = () => {
        if (refStories.current.scrollLeft <= 0) {
            setShowLeftArrow(false)
        } else {
            setShowLeftArrow(true)
        }
        if (refStories.current.scrollLeft >= refStories.current.scrollWidth - refStories.current.clientWidth - 2) {
            setShowRightArrow(false)
        } else {
            setShowRightArrow(true)
        }

    }

    useEffect(() => {

        //Adding Resize Event Listener
        window.addEventListener('resize', handleResize)
        //Fetching Stories Data
        /*const fetchData = async () => {
            try {
                setData(await getStoriesData("sapatos"));
            } catch (err) {
                console.log(err)
            } finally {
            }
        }
        fetchData();*/

        const fetchData = async () => {
            const clothTypeArray = []
            const tempClothArray = []

            try {
                const clothes = await getClothesTypes();
                clothes.forEach(clothItem => {
                    if (!clothTypeArray.includes(clothItem.type)) {
                        clothTypeArray.push(clothItem.type)
                        tempClothArray.push(clothItem)
                    }
                });
                setData(tempClothArray)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

        //Adding Scroll Event Listener to 
        const storiesEventListenerVariable = refStories.current
        storiesEventListenerVariable.addEventListener('scroll', handleStoriesScroll);


        return () => {
            window.removeEventListener('resize', handleResize)
            storiesEventListenerVariable.removeEventListener('scroll', handleStoriesScroll);
        }
    }, [])

    useEffect(() => {
        let timer;
        refStories.current.scrollLeft = scrollLeft;
        if (refStories.current.scrollWidth >= window.innerWidth - 12) {
            if (scrollLeft <= 0) {
                timer = setTimeout(() => {
                    setShowLeftArrow(false);
                }, 50);
            } else {
                setShowLeftArrow(true);
            }
            if (scrollLeft >= refStories.current.scrollWidth - refStories.current.clientWidth - 1) {
                timer = setTimeout(() => {
                    setShowRightArrow(false);
                }, 50);
            } else {
                setShowRightArrow(true);
            }
        } else {
            setShowLeftArrow(false);
            setShowRightArrow(false);
        }
        return () => clearTimeout(timer);
    }, [scrollLeft, windowSize, data])

    return (
        <StoriesWrapper>
            {
                showStoryView &&
                <StoryViewWrapper>
                    <StoryView openIndex={storyIndex} data={data} onClick={handleCloseStoriesClick} />
                </StoryViewWrapper>
            }
            <TopItem ref={refStories}>
                <LeftArrow>
                    <ArrowCircleLeftIcon value="Left" onClick={() => handleArrowClick(-300)} style={{ fontSize: 40, display: showLeftArrow ? "block" : "none" }} />
                </LeftArrow>
                {
                    data.map((cloth, index) => {
                        return <Story key={index} getStoryIndex={setStoryIndex} index={index} onClick={handleStoriesClick} cloth={cloth} />
                    })
                }
                <RightArrow>
                    <ArrowCircleRightIcon value="Right" onClick={() => handleArrowClick(300)} style={{ fontSize: 40, display: showRightArrow ? "block" : "none" }} />
                </RightArrow>
            </TopItem>
        </StoriesWrapper>
    )
}
