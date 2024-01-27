import React, { useContext, useState } from 'react'
import notesContext from '../Context/notes/notesContext'
import './addnote.css'
const AddNote = () => {
    const context = useContext(notesContext);
    const { addNote } = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""});
    const change = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    const click = ()=>{
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
    }


    return (
        <>
            <div style={{textAlign: 'center'}}><h1>AddNote</h1></div>
            <div className='combined'>
                <div>
                    <div>Title</div>
                    <div><input type='text' placeholder='title' name="title" value={note.title} onChange={change} className='txtar' /></div>
                    <div>Description</div>
                    <div><input type='text' placeholder='description' name="description" value={note.description} onChange={change} className='txtar' /></div>
                    <div>Tag</div>
                    <div><input type='text' placeholder='tag' name="tag" value={note.tag} onChange={change} className='txtar' /></div>
                    <input type='button' value='AddNote' onClick={click} className='button'/>
                </div>
            </div>
        </>
    )
}

export default AddNote