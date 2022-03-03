import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import NoteContext from '../context/notes/NoteContext';
import Note from './Note';

function Home(props) {
    const context = useContext(NoteContext);
    const { notes, getAllNotes ,editNote} = context;
    const navigate = useNavigate();
    // console.log(notes);

    const [state,setState] = useState({id:0 ,title:"",description:""});
    const handleChange = (e) =>{
        setState({
            ...state, //spread operator
            [e.target.name] : e.target.value
        })
    }
    const handleClick = (e) =>{
        e.preventDefault();
        console.log(state);
        editNote(state.id,state.title,state.description);
        props.showAlert("Edited","success")
        refClose.current.click();
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getAllNotes(token);
        }
        else{
            navigate("/login");
            props.showAlert("Plese Login First","danger");
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setState({id:currentNote.noteId,title:currentNote.title,description:currentNote.description})
    }

    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Title</label>
                                    <input onChange={handleChange} value={state.title} type="text" name="title" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Description</label>
                                    <textarea onChange={handleChange} value={state.description} type="text" name="description" className="form-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <h1>Your Notes</h1>
                <div>
                    {notes.length===0 && "No Notes To Display"}
                    {notes.map((note) => {
                        return (
                            <div className='my-3' key={note.noteId}>
                                <Note updateNote={updateNote} alert={props.showAlert} note={note} />
                            </div>
                        )
                    })}
                </div>
                <Link className="container" style={{ color: "black", fontWeight: "bold" }} to="/addNote"><i className="fas fa-plus mx-2 my-3"></i>Add Note</Link>
            </div>
        </>
    )
}

export default Home
