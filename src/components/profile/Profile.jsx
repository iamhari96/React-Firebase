import React from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/profileprotectedpage.css'


const Profile = () => {
    const { currentUser } = useAuth()
    return (
        <div className="profile-protected">
          <h1> currentUser: {currentUser.email} </h1>
        </div>
    )
}

export default Profile
