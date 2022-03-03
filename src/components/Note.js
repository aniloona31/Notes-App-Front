import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import NoteContext from '../context/notes/NoteContext';

function Note(props) {
    const context = useContext(NoteContext);
    const {note,updateNote,alert} = props;
    const {deleteNote} = context;
    const date = new Date(note.createdTime);
    //console.log(props)
    return (
        <div className='container'>
            <div className="card" style={{width : "100%"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <hr></hr>
                    <p className="card-text">{note.description}</p>
                    <p>{date.toLocaleDateString()}</p>
                    <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fas fa-trash" onClick={()=>{deleteNote(note.noteId);
                    alert("Deleted Succesfully","success")}}></i>
                </div>
            </div>
        </div>
    )
}

export default Note
