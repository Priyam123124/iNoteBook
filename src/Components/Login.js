import { useContext, useState, useEffect } from 'react'
import notesContext from '../Context/notes/notesContext';
import { useNavigate } from 'react-router-dom'
import './login.css';
import './addnote.css'
const Login = () => {
    const context = useContext(notesContext);
    const { fetchNotes, setAlert, setType, setMessage } = context;
    const navigate = useNavigate()
    const [info, setInfo] = useState({ email: "", password: "" })
    const change = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const [width, setWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    

    const logIn = async () => {
        const dneed = {
            "email": info.email,
            "password": info.password
        }
        const response = await fetch('https://i-note-book-lyart.vercel.app/api/auth/login', {
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
    const click = async () => {
        await logIn();
        await fetchNotes();
        // Redirect to "/"
        if (localStorage.getItem("token") === 'undefined') {

            setType("Fail:");
            setMessage("Failed To Log In");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500)

        } else {

            navigate("/");
            setType("Success:");
            setMessage("Logged In successfully");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500)
        }

    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: width > 600 ? 'row' : 'column' }}>
                {width > 600 && <div className='leftContainer'>
                    <img src='logo.png' style={{ width: '80%' }} alt='iNoteBook'/>
                </div>}
                <div style={{ width: width > 600 ? '50%' : '100%', justifyContent: 'center', display: 'flex' }}>
                    <div className='centereee'>
                        <div style={{fontSize: '30px', marginLeft: '20px'}}>Login to iNoteBook</div>
                        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                            <div className='font69'>Email</div>
                            <input type='text' placeholder='Email' value={info.email} name="email" onChange={change} className='txtar mar' />
                            <div className='font69'>Password</div>
                            <input type='password' placeholder='Password' value={info.password} name="password" onChange={change} className='txtar mar' />
                            <input type='button' value='Log In' onClick={click} className='button mar' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login