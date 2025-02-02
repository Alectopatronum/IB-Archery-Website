import './App.css'
import { Route, Routes } from 'react-router-dom';
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    
    <UserContextProvider>
      
        <Routes>
    
          <Route path="/" element={<Layout/>}>
            <Route index element={<IndexPage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
          </Route>
        
        </Routes>
      
    </UserContextProvider>

    
    
  )
}

export default App
