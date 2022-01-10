import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/signup.css'

const ForgotPassword = () => {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState('')
    const { forgotPassword } = useAuth()    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            await forgotPassword(email)
        }catch{
            setError('Failed to set password')
        }
        setLoading(false)
    }

    return (
        <section className="signup-form">
            <h1>Forgot Password</h1>
            <pre>{error && <div className="error-message">{error}</div>}</pre>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Id" required />
                <button type="submit" disabled={loading} className="signup">Submit</button>
                <div className="sub-form">
                <Link to="/login"> 
                    <p>Login</p>
                </Link>
                </div>
            </form>
        </section>
    )
}

export default ForgotPassword
