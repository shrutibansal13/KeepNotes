import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '../helpers/sideBar/sideBar'
import { Card, Col, Row } from 'react-bootstrap'

function Wishlist() {
  const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
  return (
    <div> 
      <Row>
      <Col md="2">
        <SideBar name='User' />
      </Col>
      <Col md="4">
        <div className='text-center px-5 py-5'>

          {allowedRoutes.includes('/explore') ?
            <Card>
              <Card.Header><h4>Wishlist</h4></Card.Header>
              <Card.Body>
                <Card.Img variant="top" src='{img}' style={{ height: "50px", width: "50px" }}></Card.Img>
                <Card.Text>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Card.Text>
              </Card.Body>
            </Card>
            :
            <>Access Denied</>}
        </div>
      </Col>
      <Col md="6"></Col>
    </Row></div>
  )
}

export default Wishlist