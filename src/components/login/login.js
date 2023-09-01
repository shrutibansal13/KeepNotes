import React, { useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useNavigate ,Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authorizationFactor } from '../../redux/slice/dataSlice';
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate =useNavigate()
    const dispatch= useDispatch()

   async function loggedIn(event) {
        let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        event.preventDefault()
        if (email === "" || password === "") {
            setError('Enter valid Credentials')
        } else if (!regemail.test(email)) {
            setError('Invalid Email')
        } else {
            try {
               
                const response = await axios.post('http://localhost:8001/login', { email, password })
                
                    if (response.data.success===false) {
                       setError('Failed');
                    }else{
                        if(typeof(response.data.data)==='string'){
                           setError(response.data.data) 
                        }else{
                        const token = response.data.data.jwtToken;
                        const role = response.data.data.roles;
                        const allowedRoutes = response.data.data.result[0].pages;
                        const userData = response.data.data.result[0];
                        const data= {token, role, allowedRoutes , userData}
                        dispatch(authorizationFactor(data))
                        if(role===false){
                            navigate(`/home`)
                        }else{
                            navigate(allowedRoutes[0])
                        }
                        
                        }
                    }

            }
            catch (error) {
                setError('Invalid Data')
            }
        }

    }
    return (
        <div>
            <Container>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6" >
                    <h4 className='text-center pt-5'> Log In</h4>
                        <Form onSubmit={loggedIn}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>New User?</Form.Label>
                            <Link to="/signup" className='text-dark ' style={{textDecoration:'none' ,fontWeight:'bold'}}>  Signup</Link>
                            </Form.Group>
                            <br></br>
                            <Button variant="dark" type="submit">
                                Log In
                            </Button>
                           <p className='text-danger'>{error}</p>
                        </Form>
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login