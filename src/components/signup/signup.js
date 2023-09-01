import React, { useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from'axios';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const pages = ['/home']

    function signIn(event){
        let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        event.preventDefault()
        if (email === "" || password === "" || name === '') {
            setError('Enter valid Credentials')
        } else if (!regemail.test(email)) {
            setError('Invalid Email')
        } else {
            let config = {
                url: 'http://localhost:8001/insertuser',
                method: 'POST',
                data: {
                    "name": name,
                    "email": email,
                    "password": password,
                    "role":1,
                    "pages":pages
                },
                headers: { 'Content-Type': 'application/json' }
            }
             
            try {
                axios.request(config).then((res)=>{
                if(res.data.data.length !== 0){
                    navigate('/login')
                }else{
                    setError(res.message)
                }
            })
            } catch(err){
                setError(err)
            }

        }


    }


    return (
        <div>
            <Container>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8" >
                        <h4  className='text-center pt-5'> Sign In</h4>
                        <Form onSubmit={signIn}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <p className='text-danger'>{error}</p>

                            <Form.Group>
                            <Form.Label>Already have an account?</Form.Label>
                            <Link to="/login" className='text-dark ' style={{textDecoration:'none' ,fontWeight:'bold'}}>  Login</Link>
                            </Form.Group>

                            <Button variant="dark" type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup