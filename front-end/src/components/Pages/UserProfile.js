import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import UserManager from '../UserManager'

export default function UserProfile() {

    return (
        <>
            <Navbar />
            <UserManager />
            <Footer />
        </>
    )
}