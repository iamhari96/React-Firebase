import React, { useRef, useState } from 'react'
import { Link,useHistory,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/login.css'



const Login = () => {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login,googlesignin } = useAuth()
    const history = useHistory()
    const location = useLocation()
    console.log(location)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push(location.state?.from ?? "/profile")
        }catch{
            setError('Failed to login')
        }
        setLoading(false)
    }

    const handlegoogle = async (e) => {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await googlesignin()
            history.push('/profile')
        }catch{
            setError('Failed to login by google')
        }
        setLoading(false)
    }

    return (
        <section className="login-form">
            <h1>Login</h1>
            <pre>{error && <div className="error-message">{error}</div>}</pre>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" ref={emailRef} placeholder="Email Id" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordRef}  placeholder="Password" required />
                <button type="submit" disabled={loading} className="login">Login</button>
                <div className="sub-form">
                <Link to="/forgotpassword"> 
                    <p>Forgot password?</p>
                </Link>
                <Link to="/signup">
                    <p>Signup</p>
                </Link>
                </div>
            </form>
            <button className="g-signin" onClick={handlegoogle}>Sign in with Google</button>
        </section>
    )
}

export default Login
