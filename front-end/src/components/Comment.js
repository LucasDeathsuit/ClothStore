import React from 'react'
import styled from 'styled-components'
import Rating from './Rating';

const Commentary = styled.div`
background-color: #fff;
border: solid 10px ${props => props.borderColor || 'pink'};
display: flex;
flex-direction: column;
flex: 1 1 0px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 25px;
`

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transform: translateY(-65%);
  gap: 8px;
`

const Avatar = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 100%;
  object-fit: cover;
  object-position: top;
`

const Username = styled.h2`
  color: #8d8d8d;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  font-weight: 400;
  word-wrap: break-word;
`

const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Title = styled.h3`
  color: #8d8d8d;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  `

const Paragraph = styled.p`
  color: #8d8d8d;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  text-align: center;
  word-wrap: normal;
  white-space: normal;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: -webkit-box;
`


export default function Comment({ borderColor, comment }) {

  return (
    <Commentary borderColor={borderColor}>
      <Content>
        <UserSection>
          <Avatar src={`images/${comment.picture}`} />
          <Username>{comment.name}</Username>
        </UserSection>
        <Rating value={comment.rate} />
        <CommentArea>
          <Title>{comment.title}</Title>
          <Paragraph>{comment.comment}</Paragraph>
        </CommentArea>
      </Content >
    </Commentary>
  )
}
