import { confirmPasswordReset, createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from '@firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState()
    const [loading,setloading] = useState(true)



    const signup = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const googlesignin = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth,provider)
    } 

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth,email, {
            url: 'http://localhost:3000/login',
        })
    }

    const resetPassword = (oobCode,newPassword) => {
        return confirmPasswordReset(auth,oobCode,newPassword)
    }
    
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setloading(false)
        })
        return () => {
            unsubscribe()
        } 

    },[])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        googlesignin,
        forgotPassword,
        resetPassword,
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}