import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth'

export const RequireAnonymous = ({ children }) => {
    const auth = useAuth()

    if (auth.user) {
        return <Navigate to='/dashboard' />
    }
    return children
}
