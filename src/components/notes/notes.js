import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import TopNavigation from '../helpers/topNavigation/topNavigation'
import SideBar from '../helpers/sideBar/sideBar'
import TextEditor from '../texteditor/texteditor'
import axios from 'axios'
import { Archive, Trash } from 'react-bootstrap-icons'

function Notes() {
  const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
  const userDetails = useSelector((state) => state.dataSlice.userData)
  const role = useSelector((state) => state.dataSlice.role)
  const [notes, setNotes] = useState([])


  async function getNotes() {
    try {
      const response = await axios.get('http://localhost:8001/getnotes')

      const result = await axios.get('http://localhost:8001/gettrash')
    
      const data = await axios.get("http://localhost:8001/getarchive")
     

      const responseData = response.data.data;
      const resultData = result.data.data;
      const archiveData = data.data.data;

      const filteredData = responseData.filter(item => 
        !resultData.some(resultItem => resultItem.note_id === item._id) &&
        !archiveData.some(archiveItem => archiveItem.note_id === item._id)
      );

        console.log(filteredData,"filteredDta");
     
      setNotes(filteredData)  
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


  async function handleArchive(id) {

    try {
      const response = await axios.post('http://localhost:8001/insertarchives?' + new URLSearchParams({
        id: id
      }))
      console.log(response.data.data, "archived");
      const result = notes.filter((item) => item._id !== response.data.data.note_id)
      setNotes(result)
    }
    catch (err) {
      console.log(`Cannout found notes:${err}`)
    }
  }

  async function trash(id) {
    try {
      const response = await axios.post('http://localhost:8001/addtrash?' + new URLSearchParams({
        id: id
      }))
      console.log(response.data.data, "addtrash");
      const result = notes.filter((item) => item._id !== response.data.data.note_id)
      setNotes(result)
    }
    catch (err) {
      console.log(`Cannout found notes:${err}`)
    }
  }

  useEffect(() => {

    getNotes()
  }, [])

  return (
    <div>
      <Row>
        <Col md="2">
          <SideBar name={userDetails.name} />
        </Col>
        <Col md="10">
          <TopNavigation />
          {allowedRoutes.includes('/notes') ?
            <div className='text-center'>
              {role === false ?
                <Card>
                  <Card.Header><h4>Welcome to Notes</h4></Card.Header>
                  <Card.Body>
                    <Card.Text>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Card.Text>
                  </Card.Body>
                </Card>
                : <>
                  <TextEditor id="" />
                  <Container fluid>
                    <Row>
                      {notes.map((note) => (
                        <Col md='3' className='px-5 py-5'  >
                          <Card className='border '>
                            <div dangerouslySetInnerHTML={{ __html: note.notes }} />
                            <Row className='p-2'>
                              <Col md="1"></Col>
                              <Col md="1">

                                <Badge pill bg="secondary">
                                  {note.labels}
                                </Badge>

                              </Col>
                              <Col md="10"></Col>
                            </Row>
                            <Row className='p-2'>
                              <Col md="8"></Col>
                              <Col md="2" >
                                <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip('Archive')}
                                >
                                  <Archive onClick={() => handleArchive(note._id)} />
                                  </OverlayTrigger>
                              </Col>
                              <Col md="2">
                              <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip('Trash')}
                                >
                                <Trash onClick={() => trash(note._id)} />
                              </OverlayTrigger>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Container>

                </>
              }
            </div>
            :
            <>Access Denied</>}
        </Col>

      </Row>
    </div>
  )
}

export default Notes