import React from 'react'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react/cjs/react.development'
import NoteContext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const initialState = {
        "title" : "",
        "description" : ""
    }
    const [state,setState] = useState(initialState);

    const handleChange = (e) =>{
        setState({
            ...state, //spread operator
            [e.target.name] : e.target.value
        })
    }

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(state.title,state.description);
        
    }
    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input onChange={handleChange} type="text" name="title" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <textarea onChange={handleChange} type="text" name="description" className="form-control"/>
                </div>
                <button onClick={handleClick} type="submit" className="btn btn-primary"><Link style={{color:"white"}}to="/">Submit</Link></button>
            </form>
        </div>
    )
}

export default AddNote
