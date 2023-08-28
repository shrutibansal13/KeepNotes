import React from 'react'
import { Row ,Col, Card} from 'react-bootstrap'
import SideBar from '../helpers/sideBar/sideBar'
import { useSelector } from 'react-redux'
import img from '../../img.jpg'
import TopNavigation from '../helpers/topNavigation/topNavigation'

function Profile() {
  const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
  const userData = useSelector((state) => state.dataSlice.userData)
  return (
    <div>
    <Row>
    <Col md="2">
    <SideBar name='User'/>
    </Col>
    <Col md="10">
      <TopNavigation/>
    <div className=' pt-5 px-5 py-5' >
   
    <Card>
        <Card.Header><h4>Edit Profile</h4></Card.Header>
        <Card.Body>
            <Card.Img variant="left" src={img} style={{ height: "50px", width: "50px" }}></Card.Img>
            <Card.Text>
              <b>User Name: </b> {userData.name}
              <br></br>
              <b>Email:</b>  {userData.email}
              
            </Card.Text>
        </Card.Body>
    </Card>

</div>
</Col>
</Row>
</div>
  )
}

export default Profile