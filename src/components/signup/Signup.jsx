import React, { useRef, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/signup.css'

const Signup = () => {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup,googlesignin } = useAuth()
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            history.push("/login")
        }catch{
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    const handlegoogle = async (e) => {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await googlesignin()
        }catch{
            setError('Failed to login by google')
        }
        setLoading(false)
    }
    
    
    return (
        <section className="signup-form">
            <h1>Signup</h1>
            <pre>{error && <div className="error-message">{error}</div>}</pre>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" ref={emailRef} placeholder="Email Id" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordRef}  placeholder="Password" required />
                <label htmlFor="confirmpassword">ConfirmPassword</label>
                <input type="password" name="confirmpassword" ref={passwordConfirmRef}  placeholder="Password-Confirmation" required />
                <button type="submit" disabled={loading} className="signup">Sign Up</button>
                <div className="sub-form">
                <Link to="/login"> 
                    <p>Login</p>
                </Link>
                </div>
                <p className="or-text">(Or)</p>
            </form>
            <button className="g-signin" onClick={handlegoogle}>Sign in with Google</button>
        </section>
    )
}

export default Signup
