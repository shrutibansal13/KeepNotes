import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CloseButton, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import TopNavigation from '../helpers/topNavigation/topNavigation'
import SideBar from '../helpers/sideBar/sideBar'
import { useSelector } from 'react-redux'
import { Archive, Check, Tag, Trash } from 'react-bootstrap-icons'
import axios from 'axios'
import TextEditor from '../texteditor/texteditor'
import { useParams } from 'react-router-dom'


function Editlabels() {

  const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
  const userDetails = useSelector((state) => state.dataSlice.userData)
  const role = useSelector((state) => state.dataSlice.role)
  const labelActivate = useSelector((state) => state.dataSlice.labelActivate)
  const [modalShow, setModalShow] = useState(false);
  const activatedLabel = localStorage.getItem('activatedLabel') || ''
  const [notes, setNotes] = useState([])
  const [label_id, setLabelId] = useState('')
  const [label, setLabel] = useState('')
 

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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip-2" >
      {props}
    </Tooltip>
  );

  // async function getlabels() {
  //   const result = await axios.get('http://localhost:8001/getLabelname?' + new URLSearchParams({
  //     id: label_id
  //   }))

  //   console.log(result.data.data[0].labels, "label_id");

  //   if (result.data.length !== 0) {
  //     setLabel(result.data.data[0].labels)
  //   }

  // }

  async function showNotes(userId) {
    try {
      console.log(labelActivate, "??????????????");
      const result = await axios.get('http://localhost:8001/getIdByLabel?' + new URLSearchParams({
        labels: labelActivate
      }))
      console.log(result.data.data[0]._id, "=lbel id");
      setLabelId(result.data.data[0]._id)

      
      const response = await axios.get('http://localhost:8001/getnotesbylabel', { params: { label_id: result.data.data[0]._id, userId: userId } })
      console.log(response.data, "sdfghjkl;kjhgfghjikljhgfghjkljhgcvb");
      setNotes(response.data.data)

   
    }
    catch (err) {
      console.log(`Could not fetch ${err}`);
    }

  }

  useEffect(() => {
    console.log(labelActivate, "labelActivate");
    setModalShow(true)

    showNotes(userDetails._id)
  }, [labelActivate])


  return (
    <div>
      <Row>
        <Col md="2">
          <SideBar name={userDetails.name} />
        </Col>
        <Col md="10">
          <TopNavigation />
          {allowedRoutes.includes('/editlabels') ?
            <div className='text-center'>
              {role === false ?
                <Card></Card>
                : <>
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />

                  <div>
                    <div className=''>
                      <TextEditor id={label_id} />
                      <Container fluid >
                        {notes.length !== 0 ?
                          <Row className='m-5'>
                            {notes.map((note) => (
                              <Col md='3' >
                                <Card className='border p-2' >
                                  <div dangerouslySetInnerHTML={{ __html: note.notes }} />
                                  <Row className='p-2'>
                                    <Col md="8"></Col>
                                    <Col md="2" >
                                    <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip('Archive')}
                                >
                                      <Archive />
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
                          : <div className='text-center p-5 text-secondary ' style={{ fontSize: "25px" }}>
                            <Tag />
                            <br></br>
                            No notes with this label yet!
                          </div>
                        }
                      </Container>
                    </div>
                  </div>
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


function MyVerticallyCenteredModal(props) {
  const userDetails = useSelector((state) => state.dataSlice.userData)
  const [label, setLabel] = useState('')
  const [showlabels, setShowLabels] = useState([])

  async function addLabel() {
    console.log(label, 'label');
    let config = {
      labels: label,
      id: userDetails._id
    }
    const response = await axios.post('http://localhost:8001/insertlabel', config)
    console.log(response);

    getlabels()

  }

  async function getlabels() {
    const result = await axios.get('http://localhost:8001/getlabels?' + new URLSearchParams({
      "id": userDetails._id
    }))
    setShowLabels(result.data.data)

  }

  useEffect(() => {
    getlabels()
  }, [])



  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title >
          Edit Label
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <Form>
            <Form.Group className="mb-3 text-centre" >
              <CloseButton className='p-3' />
              <input
                type="text"
                placeholder="Create new Label"
                className='border-bottom border-0 outline-0'
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <Check onClick={addLabel} color="grey" size={30} />
            </Form.Group>
          </Form>

          {showlabels.map((item) => (

            <div className='text-center '>{item.labels}</div>
          ))}


        </p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default Editlabels