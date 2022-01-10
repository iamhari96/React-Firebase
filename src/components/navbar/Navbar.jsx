import React, { useState } from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/navbar.css'

const Navbar = () => {
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const { logout,currentUser } = useAuth()
    const changenavbar = () => {
        setOpen(!open)
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        setError('')

        try{
            await logout()
        }catch{
            setError('Failed to log out')
        }

    }
    return (
        <header className="header">
            {error && <div className="nav-error">{error}</div>}
            <NavLink to="/" className="header_logo">Firebase Authentication</NavLink>
            <nav className={open ? 'navbar active' : 'navbar'} onClick={changenavbar}>
                {!currentUser && <NavLink to="/signup">Signup</NavLink>}
                {!currentUser && <NavLink to="/login">Login</NavLink>}
                {currentUser && <NavLink to="/profile">Profile</NavLink>}
                {<NavLink to="/protected">Protected</NavLink>}
                {currentUser && <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>}
            </nav>

            <div className="icons" onClick={changenavbar}>
                {open ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </div>
        </header>
    )
}

export default Navbar
