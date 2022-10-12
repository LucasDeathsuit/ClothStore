import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import animationData from './Animation.json'

export default function () {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Lottie options={defaultOptions} height={'100%'} width={'70%'} />
    )
}