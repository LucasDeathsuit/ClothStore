import React, { useState } from 'react'
import { createCloth, uploadImage, updateCloth, deleteCloth, deleteImages } from '../APIServices/APIServices'
import styled from 'styled-components'
import Input from '../Input'
import Button from '../Button'
import { Redirect } from '@reach/router'
import { useContext } from 'react'
import { AuthContext } from '../../Providers/Auth'
import { useEffect } from 'react'
import FileInput from '../FileInput'

const FormWrapper = styled.div`
    display: flex;
    flex: 0 0 50%;
    padding-bottom: 20px;
    flex-grow: 1;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TopInputs = styled.div`

    width: 100%;

    @media (max-height: 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    @media (max-width: 600px) {
        display: block;
    }
`

const InputWrapper = styled.div`
    width: 100%;
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;

    @media (max-width: 550px) {
        width: 100%;
    }
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    justify-content: space-around;
    margin-bottom: 1rem;

    @media (max-width: 400px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export default function AddClothForm({ selectedCloth, clothes, updateClothes, addCloth, removeCloth }) {

    const [idCloth, setIdCloth] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("")
    const [selectedFile, setSelectedFile] = useState("")

    const changeHandler = async (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleImageUpload = async (e) => {
        e.preventDefault()
        const index = clothes.findIndex(cloth => cloth.idCloth === idCloth)
        if (idCloth && selectedFile) {
            clothes[index].imageURL = await uploadImage(selectedFile, idCloth, name);
        }
        updateClothes(clothes[index]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempID = await createCloth(name, description, price, type)
        const tempCloth = { idCloth: tempID, description: description, name: name, price: price, type: type }
        addCloth(tempCloth)
    }

    const editCloth = async (e) => {
        e.preventDefault();
        if (idCloth && name && description && price && type) {
            updateCloth(idCloth, name, description, price, type)
            const index = clothes.findIndex(cloth => cloth.idCloth === idCloth)
            clothes[index].name = name
            clothes[index].description = description
            clothes[index].price = price
            clothes[index].type = type
            updateClothes(clothes[index]);
        }
    }

    const clearFields = () => {
        setIdCloth("")
        setName("")
        setDescription("")
        setPrice("")
        setType("")
    }

    const handleClearFields = async (e) => {
        e.preventDefault();
        clearFields();
    }

    const handleDeleteCloth = async (e) => {
        e.preventDefault()
        deleteCloth(idCloth)
        removeCloth(idCloth)
        clearFields()
    }

    const handleImageDeletion = async (e) => {
        e.preventDefault()
        deleteImages(idCloth)
        const index = clothes.findIndex(cloth => cloth.idCloth === idCloth)
        if (idCloth && selectedFile) {
            clothes[index].imageURL = '';
        }
        updateClothes(clothes[index]);
    }


    useEffect(() => {
        setIdCloth(selectedCloth.idCloth)
        setName(selectedCloth.name)
        setDescription(selectedCloth.description)
        setPrice(selectedCloth.price)
        setType(selectedCloth.type)
    }, [selectedCloth])

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <InputWrapper>
                    <Input className="fields" label="ID" disabled placeholder="ID" type="text" value={idCloth} name="id" />
                </InputWrapper>

                <TopInputs>
                    <InputWrapper>
                        <Input className="fields" label="Name" required placeholder="Nome da Roupa" type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input className="fields" label="Descrição" required placeholder="Descrição" type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input className="fields" label="Preço" required placeholder="Preço" type="text" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input className="fields" label="Tipo" required placeholder="Tipo" type="text" value={type} name="type" onChange={(e) => setType(e.target.value)} />
                    </InputWrapper>
                </TopInputs>
                <ButtonsWrapper>
                    <Button size="btn--small" onClick={
                        idCloth ?
                            editCloth :
                            handleSubmit
                    }>
                        {
                            idCloth ?
                                "Editar" :
                                "Criar"
                        }
                    </Button>
                    <Button type="btn--secondary" size="btn--small" onClick={handleClearFields}>
                        Limpar
                    </Button>
                    <Button type="btn--caution" size="btn--small" onClick={handleDeleteCloth}>
                        Apagar
                    </Button>
                </ButtonsWrapper>
                <InputWrapper>
                    <FileInput name="image" fileName={selectedFile.name} onChange={changeHandler} accept="image/png, image/jpg, image/gif, image/jpeg" />
                </InputWrapper>
                <ButtonsWrapper>
                    <Button type="btn--primary" size="btn--small" onClick={handleImageUpload}>
                        Adicionar Imagem
                    </Button>
                    <Button type="btn--secondary" size="btn--small" onClick={handleImageDeletion}>
                        Remover Imagens
                    </Button>
                </ButtonsWrapper>
            </Form>
        </FormWrapper>
    )
}