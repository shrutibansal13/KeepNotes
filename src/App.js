import  {Routes, Route } from "react-router-dom"
import './App.css';
import Home from './components/home/home';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Profile from './components/profile/profile';
import UpdateForm from './components/updateform/updateform';
import Notes from "./components/notes/notes";
import Notification from "./components/notifications/notification";
import Editlabels from "./components/editlabels/editlabels";

import Trash from "./components/trash/trash";
import Archives from "./components/archive/archives";

function App() {
  return (
   <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/notes" element={<Notes/>} />
    <Route path="/archives" element={<Archives/>} />
    <Route path="/trash" element={<Trash/>} />
    <Route path="/editlabels" element={<Editlabels/>} />
    <Route path="/updateform" element={<UpdateForm/>} />
    <Route path="/notification" element={<Notification/>} />

   </Routes>
  );
}

export default App;
