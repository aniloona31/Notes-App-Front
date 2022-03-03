import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react/cjs/react.development'

function SignUp(props) {

    const navigate = useNavigate();
    const initialState = {
        "username":"",
        "password":"",
        "email" : ""
    }
    const [state,setState] = useState(initialState);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const handleClick = async(e) =>{
        e.preventDefault();
        const url = "http://localhost:8080/auth/signup";
        const response = await fetch(url,{
            method : "post",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                "username" : state.username,
                "email" : state.email,
                "password": state.password
            })
        })
        if(response.status === 200){
            props.showAlert("sign up successful","success")
            navigate("/login")
        }
        else{
            props.showAlert("Account already exists","danger")
        }
        
    }
    return (
        <div className='container my-4'>
            <form className='col-lg-6 offset-lg-3'>
                <div className="form-group ">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" onChange={handleChange} className="form-control" name="username" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group ">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="email" onChange={handleChange} className="form-control" name="email" id="exampleInputPassword1"/>
                </div>
                <div className="form-group ">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} className="form-control" name="password" id="exampleInputPassword1"/>
                </div>
                
                <button type="submit" onClick={handleClick} className="btn btn-primary ">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
