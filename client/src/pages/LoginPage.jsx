import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    function handleLoginSubmit(ev){
        ev.preventDefault();
        
        try{
            const {data} = axios.post('/login', {email, password});
            setUser(data);
            alert("Login Successful");
            setRedirect(true);
        } catch (e){
            alert("Login Failed");
        }
    }    

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <div className="mt-8 grow flex items-center justify-around">
            <div className="mb-36">
                <form className="max-w-md mx-auto border p-3" onSubmit={handleLoginSubmit}>
                    <h1 className="mt-3 text-4xl text-center mb-6 font-bold text-archery-blue">LOGIN</h1>
                    <input type = "email" 
                        placeholder = "mrdaets@gmail.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}/>
                    <input type = "password" 
                        placeholder = "password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        No account?   <Link className = "underline text-archery-blue" to ={"/register"}>Register Here</Link>
                    </div>
                </form>
            </div>
           
        </div>
        
    );
}