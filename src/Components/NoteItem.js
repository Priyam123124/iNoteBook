import React, {useContext, useState} from 'react'
import './noteitem.css'
import notesContext from '../Context/notes/notesContext';

const NoteItem = (props) => {
  const context = useContext(notesContext);
  const {notes, delNote, update} = context;
   const {note} = props;
   const [pop, setPop] = useState(false);
   const [noteid, setid] = useState(null);
   const view = (id)=>{
    setPop(true);
    setid(id);
   }

   if(pop){
    document.body.style.backgroundColor = "#7D7D7D"
   } else {
    document.body.style.backgroundColor = "white"
   }

   const [note1, setNote] = useState({title: "", description: "", tag: ""});
    const change = (e) => {
        setNote({...note1, [e.target.name]: e.target.value})
    }
    const click = ()=>{
        update(note1.title, note1.description, note1.tag, noteid)
        setPop(false)
        setNote({title: "", description: "", tag: ""})
    }
    const click1 = ()=>{
      setPop(false)
    }
  return (
    <>
    {pop && <div className='popup'>
    <div style={{textAlign: 'center'}}><h1>EditNote</h1></div>
            <div className='combined'>
                <div>
                    <div>Title</div>
                    <div><input type='text' placeholder='title' name="title" value={note1.title} onChange={change} className='txtar' /></div>
                    <div>Description</div>
                    <div><input type='text' placeholder='description' name="description" value={note1.description} onChange={change} className='txtar' /></div>
                    <div>Tag</div>
                    <div><input type='text' placeholder='tag' name="tag" value={note1.tag} onChange={change} className='txtar' /></div>
                    <input type='button' value='EditNote' onClick={click} className='button'/>
                    <input type='button' value='Cancel' onClick={click1} className='button' style={{marginLeft: "4px"}}/>
                </div>
            </div>
    </div>}
    <div className='noteitem'>
        <div className='title margine'>{note.title} <i className="fa-solid fa-trash marginal" onClick={()=>{delNote(note._id)}}></i><i className="fa-solid fa-pen-to-square marginal" onClick={()=>{view(note._id)}}></i></div>
        <div className='desc margine'>{note. description}</div>
    </div>
    </>
  )
}

export default NoteItem