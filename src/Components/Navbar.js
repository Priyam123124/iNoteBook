import React, {useContext, useEffect} from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import notesContext from '../Context/notes/notesContext'

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(notesContext);
  const { fetchNotes} = context;

    useEffect(()=>{
    fetchNotes();
  }, [])

  const click = ()=>{
    localStorage.setItem("token", 'undefined');
    navigate("/login");
  }
  return (
    <>
    <div className='navbar'>
    <img className='image' src={'./logo.png'} alt='iNotebook'/>
        <ul>
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/about'>About</Link></li>
        </ul>
        <div className='logup'>
        {localStorage.getItem("token")==='undefined'  && <Link className='link' to='/signup'><input type='button' value='Sign Up' className='button dock'/></Link>}
        {localStorage.getItem("token")==='undefined' && <Link className='link' to='/login'><input type='button' value='Log In' className='button dock'/></Link>}
        {localStorage.getItem("token")!=='undefined' && <input type='button' value='Log Out' onClick={click} className='button dock'/>}
        </div>
    </div>
    </>
  )
}

export default Navbar