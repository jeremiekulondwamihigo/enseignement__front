import React, { useState } from 'react';
import "./loginScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { lien_create } from "../Static/Liens"


function LoginScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginHandler = async (e)=>{
        e.preventDefault();
        const config = {
            headers : {
                "Content-Type":"application/json",
            }
        }

        try {
            const res = await axios.post(`${lien_create}/login`, { username, password }, config)
           
                if(res.data.sucess){
                    
                    localStorage.setItem("authToken", res.data.token)
                    window.location.replace("/")

                }else{
                    setError(res.data.error)
                }
            
            setTimeout(() => {
                setError("")
            }, 4000);

        } catch (error) {
            if(error){
                setTimeout(() => {
                    setError("")
                }, 5000);
            }
        }   

    }
    return (
    <div className='login-screen'>
        <form className='login-screen__form' onSubmit={loginHandler} >
            <h3 className='login-screen__title'>Login</h3>
            { error && <span className='error-message'>{error}</span>}
            
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input 
                type="text" 
                autoComplete='off'
                required 
                id="username" 
                placeholder="Enter le nom d'utilisateur"
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
                tabIndex={1}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input 
                type="password"
                autoComplete='off' 
                required 
                id="password" 
                placeholder="Enter Password"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                tabIndex={2}
                />
            </div>
            
            <button type='submit' className='btn btn-primary' tabIndex={3}>Login</button>
            <span className='register-screen__subtext'>
                Don't have a count ?
                <Link to="/register">
                    Register
                </Link>
            </span>
        </form>
    </div>
  )
}

export default LoginScreen