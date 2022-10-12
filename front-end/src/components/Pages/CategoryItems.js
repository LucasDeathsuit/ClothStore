import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Navbar from "../Navbar";
import CategorizedItems from "../CategorizedItems"

export default function CategoryItems(props) {

    return (
        <>
            <Navbar />
            <CategorizedItems category={props.clothCategory} />
            <Footer />
        </>
    )
}