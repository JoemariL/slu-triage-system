import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import "../index.css";

import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { login } from '../actions/authActions';

function Login() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) =>{
        e.preventDefault();
        const response = await login(username, password)
        if(response.hasOwnProperty("message")) console.log(response.message);
        if(response) {
            setAuth({ access: response })
            // navigate("/dashboard", { replace: true })
        }
    }

    return( <>
        <section className="heading">
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Please Login</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input type="text" className="form-control" id="email " name="email" value={username} placeholder="Enter your E-mail" onChange={(e) => {setUsername(e.target.value)}} /> 
                </div>
                <div className="form-group">
                <input type="password" className="form-control" id="password " name="password" value={password} placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value)}} /> 
                </div>

                <div className="form-group">
                    <button type="submit" class= 'btn btn-block'>Submit</button>
                </div>

            </form>
        </section>
    </>)}

export default Login