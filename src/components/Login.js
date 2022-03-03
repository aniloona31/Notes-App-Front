import React  from 'react'
import { useState } from 'react/cjs/react.development'
import { useNavigate } from "react-router-dom";
function Login(props) {

    let navigate = useNavigate();
    const initialState = {
        "username" : "",
        "password" : ""
    }

    const [state,setState] = useState(initialState);
    const handleChange = (e) =>{
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }

    const handleClick = async(e) =>{
        e.preventDefault();
        const url = "http://localhost:8080/auth/login";
        const response = await fetch(url,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                "username": state.username,
                "password" : state.password
            })
        });
        const json = await response.json();
        if(response.status === 200){
            //redirect
            localStorage.setItem('token',json.token);
            navigate("/");
            props.showAlert("Login Successful","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger")
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
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} className="form-control" name="password" id="exampleInputPassword1"/>
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary ">Login</button>
            </form>
        </div>
    )
}

export default Login
