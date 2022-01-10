import React from 'react'
import { Redirect, Route, useLocation } from 'react-router'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = (props) => {
    const { currentUser } = useAuth()
    const location = useLocation()

    const  { path } = props
    
    if(path === "/login" || path === "/forgotpassword" || path === "/resetpassword"){
        return currentUser ? <Redirect to={location.state?.from ?? "/profile"} /> : <Route {...props} />
    }

    
    return currentUser ? <Route { ...props } /> : <Redirect to={{
        pathname: "/login",
        state: {from: path }
    }} />
}

export default ProtectedRoute
