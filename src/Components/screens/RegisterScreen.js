import React, { useState } from 'react';
import "./registerScreen.css";
import axios from "axios"
import { Link } from "react-router-dom"



function RegisterScreen({ history }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    


    const registerHandler = async (e)=>{
        e.preventDefault();
        const config = {
            header : {
                "Content-Type":"application/json"
            }
        }
        if(password !== confirmPassword){
            setError("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            }, 5000);
            return setError("Password do not match");
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/auth/register", {
                username, email, password
            }, config);

            if(data.sucess){
                localStorage.setItem("authToken", data.token)
                window.location.replace("/sign");
            }else{
                setError(data.error)
            }
            
            
        } catch (error) {
            if(error){
                setError(error.response.data.error);
                setTimeout(() => {
                    setError("")
                }, 5000);
            }
        }   

    }
    return (
    <div className='register-screen'>
        <form className='register-screen__form' onSubmit={registerHandler} >
            <h3 className='register-screen__title'>Register</h3>
            { error && <span className='error-message'>{error}</span>}
            <div className='form-group'>
                <label htmlFor='name'>Username</label>
                <input 
                type="text" 
                required 
                id="name" 
                placeholder="Enter username"
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input 
                type="email" 
                required 
                id="email" 
                placeholder="Enter Email"
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input 
                type="password" 
                required 
                id="password" 
                placeholder="Enter Password"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input 
                type="password" 
                required 
                id="confirmPassword" 
                placeholder="Confirmer le mot de passe"
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </div>
            <button type='submit' className='btn btn-primart'>Register</button>
            <span className='register-screen__subtext'>Already have a count ? <Link to="/sign">Login</Link></span>
        </form>
    </div>
  )
}

export default RegisterScreen