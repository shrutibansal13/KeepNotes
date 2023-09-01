import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

function TextEditor(props) {
  const [value, setValue] = useState('')
  const [flag, setFlag] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <div>
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col md="6" className='px-5 py-5'>
            <Form>
              <Form.Group className=" text-centre" >
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Take a note..."
                    className='border-bottom '
                    value=''
                    onClick={() => setModalShow(true)}
                  />

                  <Button variant="secondary"  onClick={() => setFlag(false)} >
                    Close
                  </Button>
                </InputGroup>
                
              </Form.Group>
            </Form>
            <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)} 
                    label_id={props.id}
                  />
            
        
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>

    </div>
  )
}


function MyVerticallyCenteredModal(props) {
  const userDetails = useSelector((state) => state.dataSlice.userData)
  const [notes, setNotes] = useState('')
  const [value1, setValue1] = useState('')

  // async function addLabel() {
  //   console.log(label, 'label');
  //   let config = {
  //     labels: label,
  //     id: userDetails._id
  //   }
  //   const response = await axios.post('http://localhost:8001/insertlabel', config)
  //   console.log(response);

   

  // }

  async function saveNote(){
    props.onHide()
    console.log(value1);
    const config={
      notes:value1,
      userId:userDetails._id,
      label_id:props.label_id
    }
    const response = await axios.post('http://localhost:8001/insertnotes',config)
      console.log(response,"saved note");
  }

  useEffect(() => {
   
  }, [])



  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title >
          Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ReactQuill value={value1} onChange={(e)=>setValue1(e)}>
      </ReactQuill>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={()=>saveNote()}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TextEditor
