import notesContext from "./notesContext";
import { useState } from "react";

const NotesState = (props) => {
  // Alert
  const [showAlert, setAlert] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);

  const initNotes = []

  //Fetch Notes

  const fetchNotes = async (url = "http://localhost:5000/api/notes/fetchallnotes") => {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token", 'undefined')
      },
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      setNotes(initNotes);
      console.log("Unauthorized access");
      return; // Exit the function to prevent further execution
    }
    const fetched = await response.json();
    if(localStorage.getItem("token")!=="Please try to login with correct credential"){
    setNotes(fetched);
    } else {
      setNotes(initNotes);
    }
  }

  const [notes, setNotes] = useState(initNotes);
  //Add a note
  const addNote = async(title, des, tag) => {
    const note = {
      "title": title,
      "description": des,
      "tag": "tag",
    }
    const addAnote = async (url = "http://localhost:5000/api/notes/addnote", data = note) => {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      if(response.status!==400){
        fetchNotes();
    setAlert(true);
    setTimeout(()=>{
      setAlert(false);
    }, 2000)
    setType("Success:");
    setMessage("Note Added Successfully");
      }
      const fetched = await response.json();
      return fetched;
    }
    // setNotes(notes.concat(note))
    await addAnote();
  }
  //Delete a note
  const delNote = async(id) => {
    const del = async(url = `http://localhost:5000/api/notes/deletenote/${id}`) => {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });
      const deleted = await response.json();
      return deleted;
    }
    await del();
    fetchNotes();
    setAlert(true);
    setTimeout(()=>{
      setAlert(false);
    }, 2000)
    setType("Success:");
    setMessage("Note Deleted Successfully");
    //  const newNotes = notes.filter((e) => { return e._id !== id })
    // setNotes(newNotes);
  }

  // Update a note
  const update = async(title, desc, tag, id)=>{
    console.log(id);
    const updata = {
      "title": title,
      "description": desc,
      "tag": tag
    }
    const updateNote = async(url=`http://localhost:5000/api/notes/updatenote/${id}`, data=updata)=>{
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data),
      });
      if(response.status!==400){
        fetchNotes();
    setAlert(true);
    setTimeout(()=>{
      setAlert(false);
    }, 2000)
    setType("Success:");
    setMessage("Note Updated Successfully");
      }
      const updated = await response.json();
      return updated;
    }
    await updateNote();
    fetchNotes();

  }
  return (
    <notesContext.Provider value={{ notes, addNote, delNote, fetchNotes, update,showAlert, setAlert, type, setType, message, setMessage, flag, setFlag }}>
      {props.children}
    </notesContext.Provider>
  )
}

export default NotesState;