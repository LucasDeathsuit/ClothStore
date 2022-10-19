import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { useRef } from "react";
import StoryContent from "./StoryContent";
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`

const StoriesRow = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    flex: none;
    transform: translate(-50%, -50%);
    display: flex;
    z-index: -5;
    height: 90vh;
    scroll-behavior: smooth;
    overflow: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    width: 100%;
    overflow-y: hidden;
    touch-action: none;


    &::-webkit-scrollbar {
        display: none;
    }
`

const Logo = styled.img`
    height: 65px;
    width: 65px;

    @media only screen and (max-width: 480px) {
        visibility: hidden;
    }
`

export default function StoryView({ data, onClick, openIndex }) {

    const refStories = useRef([])

    const refScroll = useRef(null)


    const storiesData = [
        {
            name: "null",
            imageURL: "null",

        },
        {
            name: "null",
            imageURL: "null",

        }, ...data,
        {
            name: "null",
            imageURL: "null",

        },
        {
            name: "null",
            imageURL: "null",

        }
    ]



    const newData = storiesData.map((data, index) => {
        return <StoryContent key={index} imagePath={data.imageURL} name={data.name} type={data.type} />
    })

    //Adding +2 to supress the two ghost stories.
    const [index, setIndex] = useState(openIndex + 2)


    const handleSelectedStory = (index) => {
        if (index < 2 || index > newData.length - 3) return
        setIndex(index);
    }

    useEffect(() => {

        refScroll.current.onmousedown = function (e) { if (e.button === 1) return false; }

        window.addEventListener("keydown", function (e) {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);

        const realIndex = index;
        const selectedStoryPosition = refStories.current[realIndex].offsetLeft;
        const selectedStoryWidth = refStories.current[realIndex].clientWidth
        const carouselWidth = refScroll.current.clientWidth;


        refScroll.current.scroll(
            selectedStoryPosition - (carouselWidth / 2) + (selectedStoryWidth / 2)
            , 0)


        if (refStories.current) {
            refStories.current.forEach(story => {
                story.style['transform'] = "scale(1)"
                story.style['transition'] = "200ms"
            })
        }

        refStories.current[realIndex].style['transform'] = "scale(1.5)"

    }, [index])


    const handleArrowClick = (side) => {
        if (side === "left") {
            if (index <= 2) return
            setIndex(index - 1);
        } else if (side === "right") {
            if (index >= newData.length - 3) return
            setIndex(index + 1);
        }
    }

    return (
        <>
            <NavBar>
                <Logo src="images/LogoTeste.png" />
                <CloseIcon onClick={onClick} style={{ color: "white", fontSize: "30", cursor: "pointer" }} />
            </NavBar>
            <ArrowCircleLeftIcon onClick={() => handleArrowClick("left")} style={{ cursor: "pointer", color: "white", fontSize: 50, position: "fixed", bottom: "5%", left: "50%", transform: "translate(-100%, -50%)" }} />
            <StoriesRow ref={refScroll}>
                {
                    newData.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleSelectedStory(index)}
                                key={index}
                                ref={(element) => {
                                    refStories.current[index] = element;
                                }}>
                                {item}
                            </div>
                        )
                    })
                }
            </StoriesRow>
            <ArrowCircleRightIcon onClick={() => handleArrowClick("right")} style={{ cursor: "pointer", color: "white", fontSize: 50, position: "fixed", bottom: "5%", left: "50%", transform: "translate(0%, -50%)" }} />
        </>
    )
}