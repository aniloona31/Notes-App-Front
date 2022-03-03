import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);
    //Get All Notes
    const getAllNotes = async()=> {
        const url = "http://localhost:8080/notes/getAll";
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method : "GET",
            headers : {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        const json = await response.json();
        console.log(typeof json.createdTime);
        setNotes(json);
    }

    //Add Note
    const addNote = async(title,description) => {
        const url = "http://localhost:8080/notes/add-note";
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            //this is request body
            body : JSON.stringify({title,description})
        })
        const json = response.json();
        setNotes(
            notes.concat(json)
        )
    }

    //Delete Note
    const deleteNote = async(id) => {
        //console.log("i am here" + id);
        const url = `http://localhost:8080/notes/delete/${id}`;
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        const newNotes = notes.filter((note)=>{
            return (note.noteId !== id)
        })
        setNotes(newNotes)
    }

    //Update Note
    const editNote = async(id,title,description) => {
        console.log("i am here");
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/notes/update/${id}`;
        const response = await fetch(url,{
            method : "PUT",
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            
            body : JSON.stringify({title,description})
        });
        //const json = response.json();
        const newNotes = notes.map((note)=>{
            if(note.noteId == id){
                note.title = title;
                note.description = description;
            }
            return note;
        })
        setNotes(newNotes);
    }


    return (
        //exporting notes and setNotes
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote ,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
