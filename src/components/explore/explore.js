import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import SideBar from '../helpers/sideBar/sideBar'
import { useSelector } from 'react-redux'

function Explore() {
  const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
  const arr= [1,2]
  return (
    <div>
      <Row>
        <Col md="2">
          <SideBar name='User' />
        </Col>
            {arr.map((item)=>(
        <Col md="4">
          <div className='text-center px-5 py-5'>
            {allowedRoutes.includes('/explore') ?

              <div>
              <Card>
                <Card.Header>Explore</Card.Header>
                <Card.Body>
                  <Card.Img variant="left" src='' style={{ height: "50px", width: "50px" }}></Card.Img>
                  <Card.Text>Lorem Ipsum has been the industry's</Card.Text>
                </Card.Body>
              </Card>
              </div>
              :
              <>Access Denied</>}
          </div>
        </Col>
              ))}
      </Row>
    </div>
  )
}

export default Explore