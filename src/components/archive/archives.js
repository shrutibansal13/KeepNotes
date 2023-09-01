import React from 'react'
import TopNavigation from '../helpers/topNavigation/topNavigation'
import SideBar from '../helpers/sideBar/sideBar'
import { Card, Col, Container, Row, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Archive, Trash } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Archives() {
    const allowedRoutes = useSelector((state) => state.dataSlice.allowedRoutes)
    const userDetails = useSelector((state) => state.dataSlice.userData)
    const role = useSelector((state) => state.dataSlice.role)
    const [notes, setNotes] = useState([])

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip-2" >
            {props}
        </Tooltip>
    );

    async function handleUnArchive(id) {
        try {
            const response = await axios.delete('http://localhost:8001/deletearchives?' + new URLSearchParams({
                id: id
            }))
            console.log(response.data.data, "deleted");
            getArchives()

        }
        catch (err) {
            console.log(`Cannout found notes:${err}`)
        }
    }

    async function getArchives() {
        try {
            const response = await axios.get('http://localhost:8001/getarchive?'+new URLSearchParams({
                id:userDetails._id
              }))
            console.log(response);
            setNotes(response.data.data)
        }
        catch (err) {
            console.log(`Cannout found notes:${err}`)
        }
    }

    async function trash(id) {

    }


    useEffect(() => {
        getArchives()
    }, [])

    return (
        <div>
            <Row>
                <Col md="2">
                    <SideBar name={userDetails.name} />
                </Col>
                <Col md="10">
                    <TopNavigation name='Archives' />
                    {allowedRoutes.includes('/archives') ?
                        <div className='text-center'>
              <h3 className='mt-5'>Archives</h3>
                            {role === false ?
                                <Card>
                                    <Card.Header><h4>Welcome to Notes</h4></Card.Header>
                                    <Card.Body>
                                        <Card.Text>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Card.Text>
                                    </Card.Body>
                                </Card>
                                : <>
                                
                                    {notes.length !== 0 ? <Container fluid>
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
                                                                    <Archive onClick={() => handleUnArchive(note._id)} />
                                                                </OverlayTrigger>
                                                            </Col>
                                                            <Col md="2">
                                                                <Trash onClick={() => trash(note._id)} />

                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                        : <div className='text-center p-5 text-secondary ' style={{ fontSize: "25px" }}>
                                            <Archive className='text-secondary' />
                                            <br></br>
                                            Your archived notes appear here
                                        </div>}

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

export default Archives