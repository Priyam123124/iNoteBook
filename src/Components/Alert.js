import React, {useContext} from 'react'
import notesContext from '../Context/notes/notesContext'
import './alert.css'

function Alert(props) {
  const context = useContext(notesContext);
  const {showAlert, type, message} = context;
  // const {type, message, showAlert} = props
  return (
    <div className='space'>
    {showAlert && <div className='alert' style={{backgroundColor: '#D4E7DE', color: '#014d29'}}><b>{type}</b> {message}<div className='margin'></div></div>}
    </div>
  )
    
  
}

export default Alert