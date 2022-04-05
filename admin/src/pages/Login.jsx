import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import "../index.css";
import "../login.css";
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
        Saint Louis University
        </h1>
        <h6>Admin TRIAGE APPLICATION Login</h6>
        </section>
        
        <div class="cardContainer">
           <div class="loginCard">
            <form onSubmit={onSubmit}>
                <div>
                <input type="text" class="loginform"  id="email " name="email" value={username} placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} /> 
                </div>
                <div >
                <input type="password" class="loginform"  id="password " name="password" value={password} placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value)}} /> 
                </div>

            <div >
                 <button type="submit" class= 'loginbutton'>Login</button>
            </div>
            </form>
            </div>
            </div>
    </>)}

export default Login