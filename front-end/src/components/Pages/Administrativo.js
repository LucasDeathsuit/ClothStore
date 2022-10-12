import React, { useState, useEffect, useCallback } from 'react'
import AddClothForm from '../Administrative/AddClothForm'
import styled from 'styled-components'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Cookies from 'universal-cookie'
import AddClothImageForm from '../Administrative/AddClothImageForm'
import { getClothesFirstImage } from '../APIServices/APIServices'
import Filtered from '../Filtered'
import Button from '../Button'

const ManageClothes = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    margin: auto;
    justify-content: center;
    align-items: flex-start;
    padding-top: 90px;
    height: auto;
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
                return {...cloth, name: editedCloth.name, description: editedCloth.description, type: editedCloth.type, price: editedCloth.price}
            }
            return cloth
        })

        setClothes(updatedClothes)
    }

    return (
        <>
            <Navbar />
            <ManageClothes>
                <AddClothForm clothes={clothes} selectedCloth={selectedCloth} updateClothes={updateClothes} addCloth={addCloth}/>
                <Filtered clothes={clothes} onClick={handleClothSelection} />
            </ManageClothes>
            <AddClothImageForm />
            <Footer />
        </>
    )
}