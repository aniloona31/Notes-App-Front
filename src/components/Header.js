import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header() {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        console.log(location);
    },[location])
    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">iNoteBook</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">about</Link>
                        </li>
                    </ul>

                </div>
                <form className='d-flex'>
                    {!localStorage.getItem('token') && <Link className='btn btn-primary mx-2' to='/login'>Login</Link>}
                    {!localStorage.getItem('token') && <Link className='btn btn-primary mx-2' to='/signup'>Sign Up</Link>}
                    {localStorage.getItem('token') && <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                </form>
            </nav>
        </div>
    )
}

export default Header
