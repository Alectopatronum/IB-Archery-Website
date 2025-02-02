import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [WAP_id, setWAP_id] = useState('');
    const [age, setAge] = useState('');
    const [discipline, setDiscipline] = useState('');
  
    function registerUser(ev) {
      ev.preventDefault();

      try{
        axios.post('/register', {
            name,
            email,
            password,
            WAP_id,
            age,
            discipline
          })
          .then(response => {
            console.log('Registration successful:', response.data);
            // Handle successful registration (e.g., show a success message)
          })
          .catch(error => {
            console.error('There was an error registering the user:', error);
            // Handle errors (e.g., show an error message)
          });
    
          alert('Registration successful!');
      } catch(e){
        alert('Registration failed.');
      }
      
    }

    return(
        <div className="mt-8 grow flex items-center justify-around">
            <div className="mb-36">
                <form className="max-w-md mx-auto border p-3" onSubmit={registerUser}>
                    <h1 className="mt-3 text-4xl text-center mb-6 font-bold text-archery-blue">REGISTER</h1>
                        <label className ="font-bold text-left text-xl mr-72 text-archery-blue">FULL NAME</label>
                    <input type = "text" 
                        placeholder = "Lance Daet" 
                        value={name} 
                        onChange={(ev)=> setName(ev.target.value)}/>
                        
                    <label className ="font-bold text-left text-xl mr-80 text-archery-blue">EMAIL</label>
                    <input type = "email" 
                        placeholder = "mrdaets@gmail.com"
                        value={email} 
                        onChange={(ev)=> setEmail(ev.target.value)}/>
                   
                   <label className ="font-bold text-left text-xl mr-72 text-archery-blue">DISCIPLINE</label>
                   <select className = "text-left" onChange={(ev)=> setDiscipline(ev.target.value)}>
                      <option value ="recurve">RECURVE</option>
                      <option value ="compound">COMPOUND</option>
                    </select>
                  
                  <label className ="font-bold text-left text-xl mr-72 text-archery-blue">CATEGORY</label>
                   <select className = "text-left" onChange={(ev)=> setAge(ev.target.value)}>
                      <option value ="U12M">U12M</option>
                      <option value ="U15M">U15M</option>
                      <option value ="U18M">U18M</option>
                      <option value ="U21M">U21M</option>
                      <option value ="OPEN MEN">OPEN MEN</option>
                      <option value ="U12F">U12F</option>
                      <option value ="U15F">U15F</option>
                      <option value ="U18F">U18F</option>
                      <option value ="U21F">U21F</option>
                      <option value ="OPEN FEMALE">OPEN FEMALE</option>
                    </select>
                    <br></br>
                    <label className ="font-bold text-left text-xl mr-52 text-archery-blue">WORLD ARCHERY ID</label>
                    <input type = "text" 
                        placeholder = "WAP ID"
                        value={WAP_id} 
                        onChange={(ev)=> setWAP_id(ev.target.value)}/>

                    <label className ="font-bold text-left text-xl mr-72 text-archery-blue">PASSWORD</label>
                    <input type = "password" 
                        placeholder = "password"
                        value={password} 
                        onChange={(ev)=> setPassword(ev.target.value)}/>
                    
                    
                    <button className="primary">REGISTER</button>
                    <div className="text-center py-2 text-gray-500">
                        Already Have an account?  <Link className = "underline text-archery-blue" to ={"/login"}>Login Here</Link>
                    </div>
                </form>
            </div>
           
        </div>
        
    );
}