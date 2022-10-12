import React from 'react'
import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star';



const RatingValue = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
`

export default function Rating({value}) {

    let stars = [];

    for (let index = 0; index < 5; index++) {
        if (index < value) {
            stars.push(<StarIcon key={index} sx={{color: "gold"}}/>)
        } else {
            stars.push(<StarIcon key={index} sx={{color: "gray"}}/>)
        }
    }

  return (
      <RatingValue>
          {stars}
      </RatingValue>
  )
}
