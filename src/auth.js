import jwtDecode from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const cookies = new Cookies()
    const token = cookies.get('jwt_authorization')
    const [user, setUser] = useState(token?[{data: jwtDecode(token), token: token}] : null)

    const login = (token) => {
        const decoded = jwtDecode(token)
        setUser([{data: decoded, token: token}])
        cookies.set("jwt_authorization", token, {
            expires: new Date(decoded.exp * 1000)
        })
    }

    const logout = () => {
        setUser(null)
        cookies.remove('jwt_authorization')
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}
