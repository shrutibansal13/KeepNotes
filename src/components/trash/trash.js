import React from 'react'
import { Card, OverlayTrigger, Row, Col, Container, Badge, Tooltip } from 'react-bootstrap'
import SideBar from '../helpers/sideBar/sideBar'
import TopNavigation from '../helpers/topNavigation/topNavigation'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Trash2Fill, Trash3 } from 'react-bootstrap-icons'
import axios from 'axios'


function Trash() {
  const userDetails = useSelector((state) => state.dataSlice.userData)
  const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
  const role = useSelector((state) => state.dataSlice.role)
  const [notes, setNotes] = useState([])

  async function handleDelete(id) {
        try {
          const response = await axios.delete('http://localhost:8001/deletenotes?' + new URLSearchParams({
            id: id
          }))
          console.log(response.data.data, "deleted");
          getTrash()
    
        }
        catch (err) {
          console.log(`Cannout found notes:${err}`)
        }
  }

  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip-2" >
      {props}
    </Tooltip>
  );

  async function handleUndo(id) {
    try {
      const response = await axios.delete('http://localhost:8001/deleteundo?' + new URLSearchParams({
        id: id
      }))
      console.log(response.data.data, "deleted");
      getTrash()

    }
    catch (err) {
      console.log(`Cannout found notes:${err}`)
    }
  }

  async function getTrash() {
    try {
      const response = await axios.get('http://localhost:8001/gettrash?'+new URLSearchParams({
        id:userDetails._id
      }))
      console.log(response, "logggggggggg");
      setNotes(response.data.data)
    }
    catch (err) {
      console.log(`Cannout found notes:${err}`)
    }
  }
  useEffect(() => {
    console.log('trash here');
    getTrash()
  }, [])

  return (
    <div>
      <Row>
        <Col md="2">
          <SideBar name={userDetails.name} />
        </Col>
        <Col md="10">
          <TopNavigation />
          {allowedRoutes.includes('/trash') ?
            <div className='text-center'>
              <h2 className='mt-5'>Trash</h2>
              {role === false ?
                <Card>
                  <Card.Header><h4>Welcome to Notes</h4></Card.Header>
                  <Card.Body>
                    <Card.Text>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Card.Text>
                  </Card.Body>
                </Card>
                :
                <>
                  {notes.length !== 0 ?
                    <Container fluid>
                      <Row>
                        {notes.map((note)=>(
                          <Col md="3" className='px-5 py-5'>
                            <Card className='border'>
                            <div dangerouslySetInnerHTML={{ __html: note.notes }} />
                            <Row className='p-2'>
                              <Col md="2" >
                                {/* <Badge pill bg='secondary' >{note.labels}</Badge> */}
                              </Col>
                              <Col md="6"> </Col>
                              <Col md="2"> 
                              <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip('Undo')}
                                >
                              <Trash3 onClick={() => handleUndo(note._id)} />
                              </OverlayTrigger>
                              </Col>
                              <Col md="2">
                              <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip('Delete Permanently')}
                                >
                              <Trash2Fill onClick={() => handleDelete(note._id)}/>
                              </OverlayTrigger>
                              </Col>
                            </Row>

                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                    :
                    <div className='text-center p-5 text-secondary ' style={{ fontSize: "25px" }}>
                      Your deleted notes appear here
                    </div>}
                </>}
            </div>
            :
            <>Access Denied</>}
        </Col>
      </Row>
    </div>
  )
}

export default Trash