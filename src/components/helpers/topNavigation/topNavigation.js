import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useDispatch, useSelector } from 'react-redux'
import { authorizationFactor } from '../../../redux/slice/dataSlice'
import { useNavigate , Link} from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios';
import image from '../../../images/239321-middle.png'
const socket = io.connect("http://localhost:8001")

function TopNavigation(props) {

  const role = useSelector((state)=>state.dataSlice.role)
  const [notification, setNotification] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function logout() {
    const data = {
      token: '',
      role: true,
      allowedRoutes: []
    }
    dispatch(authorizationFactor(data))
    navigate('/login')
  }

  function gotopage(pagename){
    console.log(pagename);
    navigate(`/${pagename}`)
  }

  async function getNotifications(){
    try{
        const response= await axios.get('http://localhost:8001/getnotifications')
        console.log(response);
        setNotification(response.data.data)
    }catch(err){
      console.log(`Could not fetch : ${err}`);
    }
  }


  useEffect(() => {

    getNotifications()
    socket.on("receivedMessage", (messages) => {
      console.log(messages, "message");
      setNotification(messages);
    })

  }, [socket])

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: '100px', width: '100%' }}>
        <Container>
          <Navbar.Brand className='px-5'><h2> {props.name}</h2> </Navbar.Brand>
          <Nav className="justify-content-end ">

           {role===false? <Nav.Link onClick={()=>gotopage('notification')} >Notification<Badge pill bg="light" text="dark">{notification.length}</Badge></Nav.Link>:<></>}
            <Nav.Link onClick={()=>gotopage('profile')}>Profile</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <div>{notification}</div> */}
    </div>
  )
}

export default TopNavigation
