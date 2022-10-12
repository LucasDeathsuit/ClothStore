import React, { useState } from 'react'

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState({
        username: undefined,
        userAccess: undefined,
        isLoggedIn: undefined,
        token: undefined
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}