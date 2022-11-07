import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../Navbar'
import Input from '../Input'
import Button from '../Button'
import Footer from '../Footer'
import { createComment } from '../APIServices/APIServices'

const Container = styled.div`
    min-height: calc(100vh - 111px - 130.33px);
    padding: 110px 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    row-gap: 25px;
`

export default function Avalienos() {

    const [name, setName] = useState("")
    const [picture, setPicture] = useState("")
    const [rate, setRate] = useState("")
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        createComment(name, picture, rate, title, comment);
    }

    return (
        <>
            <Navbar />
            <Container>
                <Form>
                    <Input label="Nota" required placeholder="Insira sua nota" type="text" value={rate} name="rate" onChange={(e) => setRate(e.target.value)} />
                    <Input label="Título" placeholder="Título de seu comentário" type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
                    <Input label="Comentário" placeholder="Comentário" type="text" value={comment} name="comment" onChange={(e) => setComment(e.target.value)} />
                    <Button size="btn--small" onClick={handleSubmit}>Enviar</Button>
                </Form>
            </Container>
            <Footer />
        </>
    )
}
