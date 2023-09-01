import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectedUser } from '../../redux/slice/dataSlice';
import img from '../../img.jpg'
import SideBar from '../helpers/sideBar/sideBar';
import TopNavigation from '../helpers/topNavigation/topNavigation';

function Home() {
    const [users, setUsers] = useState([])
    const token = useSelector((state) => state.dataSlice.token)
    const role = useSelector((state) => state.dataSlice.role)
    const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
    const userDetails = useSelector((state) => state.dataSlice.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    async function userData() {
        try {
            const response = await axios.get('http://localhost:8001/getalluser')
            console.log(response);
            setUsers(response.data.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    function update(val) {

        dispatch(selectedUser(val))
        navigate('/updateform')
    }


    useEffect(() => {
        if (token) {

            if (role === false) {
                userData();
            } else {
                console.log('userrrrrrrr');
            }
        } else {
            alert('Session Expired')
            navigate('/login')
        }

    }, [])

    return (
        <div>

            {role === false ?
                <Row>
                    <Col md="2" style={{width:'17%', height:'fit-content'}}>
                        <SideBar name='Admin' />
                    </Col>
                    <Col md="10" style={{width:'83%'}}>
                        <TopNavigation name='Home'/>
                        <Row  style={{paddingLeft:'25px'}}>
                            <Col md='10'>

                                <Row><h4>User List</h4></Row>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr>
                                                <th>{user._id}</th>
                                                <th>{user.name}</th>
                                                <th>{user.email}</th>
                                                <th>
                                                    <Button variant='secondary' value={user._id} onClick={(event) => update(event.target.value)}> Change Settings</Button>
                                                </th>
                                            </tr>))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md='2'></Col>
                        </Row>
                    </Col>

                </Row>
                : <div>
                    <Row>
                        <Col md="2">
                            <SideBar name={userDetails.name} />
                        </Col>
                        <Col md="10">
                            <TopNavigation  name='Home'/>
                            <div className='text-centre'>Access Denied</div>
                            {/* <div className='text-center'>
                                {allowedRoutes.includes('/home') ?
                                    <Card>
                                        <Card.Header><h4>Welcome to Home</h4></Card.Header>
                                        <Card.Body>
                                            <Card.Img variant="top" src={img} style={{ height: "50px", width: "50px" }}></Card.Img>
                                            <Card.Text>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    :
                                    <>Access Denied</>}
                            </div> */}
                        </Col>

                    </Row>


                </div>}
        </div>
    )
}

export default Home