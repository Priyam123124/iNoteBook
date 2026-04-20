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
        <div style={{background: '#F8FAFCB3', borderRadius: '10px', boxShadow: '0 6px 20px rgba(0,0,0,0.15)', width: '70%', height: '450px', paddingTop: '10px'}}>
            <div style={{marginLeft: '20px'}}><h3>Add a New Note</h3></div>
            <div className='combined'>
                <div>
                    <div className='name'>Title</div>
                    <div><input type='text' placeholder='title' name="title" value={note.title} onChange={change} className='txtar' /></div>
                    <div className='name'>Description</div>
                    <div><textarea placeholder='description' name="description" value={note.description} onChange={change} className='txtar' style={{height: '80px'}} /></div>
                    <div className='name'>Tag</div>
                    <div><input type='text' placeholder='tag' name="tag" value={note.tag} onChange={change} className='txtar' /></div>
                    <input type='button' value='AddNote' onClick={click} className='button'/>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddNote