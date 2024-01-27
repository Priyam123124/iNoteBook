import React, {useContext, useEffect, useState} from 'react'
import notesContext from '../Context/notes/notesContext';
import NoteItem from './NoteItem'
import './notes.css'

const Notes = () => {
    const context = useContext(notesContext);
    const {notes, fetchNotes} = context;
    const [flag, setFlag] = useState(true);
  
    useEffect(() => {
      fetchNotes();
    },[]);

  return (
    <>
    <div className='class'><div className='text'>Your Notes</div></div>
    <div className='container'>
      {notes.length===0 && <div className='broad'><div>No Notes To display</div></div>}
      {notes && notes.map((note)=>{
      return <NoteItem key={note._id} note={note}/>})}
      </div>
    </>
  )
}

export default Notes