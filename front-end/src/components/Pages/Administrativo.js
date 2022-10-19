import React, { useState, useEffect, useCallback } from 'react'
import AddClothForm from '../Administrative/AddClothForm'
import styled from 'styled-components'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Cookies from 'universal-cookie'
import AddClothImageForm from '../Administrative/AddClothImageForm'
import { getClothesFirstImage } from '../APIServices/APIServices'
import Filtered from '../Filtered'
import Container from '../Container'
import Button from '../Button'

const ManageClothes = styled.div`
    position: relative;
    display: flex;
    gap: 25px;
    margin: auto;
    justify-content: space-around;
    padding-top: 100px;
    min-height: calc(100vh - 101px - 130.33px);
    height: auto;
    max-width: 1200px;
    overflow: hidden;

    @media (max-width: 1200px) {
        max-width: 960px;
    }

    @media (max-width: 1000px) {
        padding-top: 110px;
        flex-direction: column-reverse;
        align-items: center;
    }
`

export default function Administrativo() {


    const [clothes, setClothes] = useState([])
    const [selectedCloth, setSelectedCloth] = useState({})

    useEffect(() => {
        async function fetchData() {
            setClothes(await getClothesFirstImage());
        }
        fetchData();
    }, [])


    const handleClothSelection = (cloth) => {
        setSelectedCloth(cloth)
    }

    const addCloth = (addedCloth) => {
        const updatedClothes = [...clothes, addedCloth]

        setClothes(updatedClothes)
    }

    const updateClothes = (editedCloth) => {
        const updatedClothes = clothes.map((cloth) => {

            if (editedCloth?.idCloth === cloth.idCloth) {
                return { ...cloth, name: editedCloth.name, description: editedCloth.description, type: editedCloth.type, price: editedCloth.price }
            }
            return cloth
        })

        setClothes(updatedClothes)
    }

    const removeCloth = (removedClothID) => {
        const updatedClothes = clothes.filter((cloth) => {
            if (removedClothID !== cloth.idCloth) {
                return cloth
            }
        })

        setClothes(updatedClothes)
    }

    return (
        <>
            <Navbar />
            <Container>
                <ManageClothes>
                    <AddClothForm clothes={clothes} selectedCloth={selectedCloth} updateClothes={updateClothes} addCloth={addCloth} removeCloth={removeCloth} />
                    <Filtered clothes={clothes} onClick={handleClothSelection} />
                </ManageClothes>
                <AddClothImageForm />
            </Container>
            <Footer />
        </>
    )
}