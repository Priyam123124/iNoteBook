import React, {useContext, useState} from 'react'
import notesContext from '../Context/notes/notesContext';
import {useNavigate} from 'react-router-dom'
import './login.css';
import './addnote.css'
const Login = () => {
    const context = useContext(notesContext);
    const {fetchNotes, setAlert, setType, setMessage} = context;
    const navigate = useNavigate()
    const [info, setInfo] = useState({email: "", password: ""})
    const change = (e)=>{
        setInfo({...info, [e.target.name]: e.target.value})
    }
    
    const logIn = async()=>{
        const dneed = {
            "email": info.email,
            "password": info.password
        }
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dneed)
        });
        const logged = await response.json();
        console.log(logged);
        localStorage.setItem("token", (logged.authData))
        return logged;
    }
    const click = async()=>{
        await logIn();
        await fetchNotes();
        // Redirect to "/"
        if(localStorage.getItem("token")==='undefined'){

            setType("Fail:");
            setMessage("Failed To Log In");
            setAlert(true);
            setTimeout(()=>{
            setAlert(false);
            }, 1500)

        } else {

            navigate("/");
            setType("Success:");
            setMessage("Logged In successfully");
            setAlert(true);
            setTimeout(()=>{
                setAlert(false);
            }, 1500)
        }

    }
    return (
        <>
            <div className='centereee'>
                <h5>Login to iNoteBook</h5>
                <div style={{display: "flex", flexDirection: "column", margin: "5px"}}>
                    <div className='font69'>Email</div>
                    <div className=''><input type='text' placeholder='Email' value={info.email} name="email" onChange={change} className='txtar' /></div>
                    <div className='font69'>Password</div>
                    <div><input type='password' placeholder='Password' value={info.password} name="password" onChange={change} className='txtar'/></div>
                    <input type='button' value='Log In' onClick={click} className='button'/>
                </div>
            </div>
        </>
    )
}

export default Login