import React, { useState } from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/resetpassword.css'

const useQuery = () => {
    const location = useLocation()
    return new URLSearchParams(location.search)
}

const ResetPassword = () => {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [newPassword,setNewPassword] = useState('')
    const { resetPassword } = useAuth()
    const history = useHistory()
    const query = useQuery()
    console.log(query.get('mode'))
    console.log(query.get('oobCode'))
    console.log(query.get('continueUrl'))

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            await resetPassword(query.get('oobCode'), newPassword)
            history.push('/login')
        }catch{
            setError('Failed to reset the password')
        }
        setLoading(false)
    }

    return (
        <section className="reset-form">
            <h1>Reset Password</h1>
            <pre>{error && <div className="error-message">{error}</div>}</pre>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Reset Password" required />
                <button type="submit" disabled={loading} className="reset">Submit</button>
            </form>
        </section>
    )
}

export default ResetPassword
