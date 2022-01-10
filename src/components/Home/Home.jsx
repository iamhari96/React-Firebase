import React from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/home.css'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div className="container">
            {"currentUser is "+ currentUser}
            <h1>Authentication</h1>
            <p>Login</p>
            <p>Signup</p>
            <p>Forgot Password</p>
            <p>Protected Routes</p>
        </div>
    )
}

export default Home
