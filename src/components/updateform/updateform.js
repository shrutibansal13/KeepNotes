import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8001")

function UpdateForm() {
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [defaultpages,setDefaultPages]= useState([])
  const [password,setPassword]= useState('')
  const [pages, setPages] = useState([])
  const [selectedpage,setSelectedPage]= useState([])
  const [error,setError]= useState('')
  const selectedId= useSelector((state)=>state.dataSlice.selectedUserId)
  const navigate= useNavigate()
  // socket.emit('sendMessage', {message:"hellloooooo"});

async function getUserData(id){
try{
    const response= await axios.get('http://localhost:8001/getuserbyId?'+new URLSearchParams({id:id}))
    const data= response.data.data[0]
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
    setDefaultPages(data.pages)
}
catch(err){
  console.log(`Could not fetch data:${err}`);
}
} 


async function getPermissionsData(){
  try{
      const response= await axios.get('http://localhost:8001/getpermissions')
      console.log(response.data.data,"perrrrrrrrrrr");
      const pageData= response.data.data.map((value)=>value.pages)
      setPages(pageData)
  }
  catch(err){
      console.log(`Could not fetch ${err}`);
  }
}


async function selectedPages(pagename){
  const index= defaultpages.indexOf(pagename)

    if(index > -1){
      const removePage = defaultpages.splice(index, 1)
      const remainingPages = defaultpages.filter((item)=>item!== removePage)
      setDefaultPages(remainingPages)
      

    }else{
      setDefaultPages([...defaultpages,pagename])
    }
   

}

async function updateUser(event){
  event.preventDefault();
  const data=  {
    "name": name,
    "email": email,
    "role":1,
    "pages":defaultpages
}
  const response= await axios.post('http://localhost:8001/updateuser?'+new URLSearchParams({"id":selectedId}),data,{ 'Content-Type': 'application/json' })
  console.log(response.data.data,"updattttttttttttttt");
  socket.emit("sendMessage",
  { userId:response.data.data.id,
    message:`Admin have updated ${response.data.data.data.name} Data`
  })
  navigate('/home')

}

useEffect(()=>{
     

 getPermissionsData()
 getUserData(selectedId)

},[])

  return (
    <div>
         <Container>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <h4> UpdateForm</h4>
                        <Form onSubmit={updateUser}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" value={name} placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                              {pages.map((page,index)=>(
                                 <Form.Check key={page} type="checkbox" checked={defaultpages.includes(page)} label={page.split('/')} value={page} onChange={()=>selectedPages(page)} />
                              ))
                              } 
                            </Form.Group>
                           {error}

                          

                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </Container>
    </div>
  )
}

export default UpdateForm