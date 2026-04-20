import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import notesContext from '../Context/notes/notesContext';

const SignUp = () => {
  const context = useContext(notesContext);
  const { setAlert, setType, setMessage, flag, setFlag } = context;
  const [bady, setBady] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const onChange = (e) => {
    setBady({ ...bady, [e.target.name]: e.target.value });
  }

  const createaccount = async () => {
    const response = await fetch("https://i-note-book-lyart.vercel.app/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bady)
    });
    if (response.status !== 400) {
      setFlag(true);
    } else setFlag(false);
    const createacc = await response.json();
    return createacc;
  }

  const handleclick = async () => {
    await createaccount();
    if (!flag) {
      setType("Fail:");
      setMessage("Please Sign Up With A Valid Email");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500)
    } else {
      navigate("/login")
      setType("Success:");
      setMessage("Created Your Account Successfully");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500)
    }
  }


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className='leftContainer'>
          <img src='logo.png' style={{width: '80%'}} alt='iNoteBook'/>
        </div>
        <div style={{width: '50%', justifyContent: 'center', display: 'flex'}}>
        <div className='centereee'>
          <div style={{fontSize: '30px', marginLeft: '20px'}}>Sign Up to iNoteBook</div>
          <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
            <div className='font69'>Name</div>
            <input type='text' placeholder='Name' name="name" value={bady.name} onChange={onChange} className='txtar mar' />
            <div className='font69'>Email</div>
            <input type='text' placeholder='Email' name="email" value={bady.email} onChange={onChange} className='txtar mar' />
            <div className='font69'>Password</div>
            <input type='password' placeholder='Password' name="password" value={bady.password} onChange={onChange} className='txtar mar' minLength={5} required />
            <input type='button' value='Sign Up' onClick={handleclick} className='button mar' />
          </div>
        </div>
        </div>
        </div>
    </>
  )
}

export default SignUp