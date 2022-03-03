import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import AddNote from './components/AddNote';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import { useState } from 'react/cjs/react.development';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type) =>{
    console.log("here")
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <div>
      <NoteState>
      <Router>
        <Header/>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/addNote" element={<AddNote/>}></Route>
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
