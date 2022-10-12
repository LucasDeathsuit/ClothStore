import React, { useState } from 'react'
import { createCloth, uploadImage, updateCloth } from '../APIServices/APIServices'
import styled from 'styled-components'
import Input from '../Input'
import Button from '../Button'
import { useContext } from 'react'
import { AuthContext } from '../../Providers/Auth'
import { useEffect } from 'react'

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 20px;

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TopInputs = styled.div`


    @media (max-height: 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
`

const InputWrapper = styled.div`
    width: 100%;
    margin: 1rem 0;

    @media (max-width: 550px) {
        width: 100%;
    }
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    width: 360px;
    justify-content: space-around;
    margin-bottom: 1rem;
`

export default function AddClothForm({ selectedCloth, clothes, updateClothes, addCloth }) {

    const [idCloth, setIdCloth] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [isFilePicked, setIsFilePicked] = useState(false)

    const changeHandler = async (e) => {
        setSelectedFile(e.target.files[0])
        setIsFilePicked(!isFilePicked)
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
        const index = clothes.findIndex(cloth => cloth.idCloth === tempID)
        setIdCloth(tempID)
        addCloth(tempCloth)
    }

    const editCloth = async (e) => {
        e.preventDefault();
        updateCloth(idCloth, name, description, price, type)
        const index = clothes.findIndex(cloth => cloth.idCloth === idCloth)
        clothes[index].name = name
        clothes[index].description = description
        clothes[index].price = price
        clothes[index].type = type
        updateClothes(clothes[index]);
    }

    const handleClearFields = async (e) => {
        e.preventDefault();
        setIdCloth("")
        setName("")
        setDescription("")
        setPrice("")
        setType("")
    }

    const { user } = useContext(AuthContext)

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
                        Excluir
                    </Button>
                    <Button type="btn--secondary" size="btn--small" onClick={handleClearFields}>
                        Limpar
                    </Button>
                </ButtonsWrapper>
                <InputWrapper>
                    <Input className="fields" label="Image" required placeholder="Image" type="file" name="image" multiple onChange={changeHandler} />
                </InputWrapper>
                <Button type="btn--primary" size="btn--small" onClick={handleImageUpload}>
                    Adicionar Imagem
                </Button>
            </Form>
        </FormWrapper>
    )
}