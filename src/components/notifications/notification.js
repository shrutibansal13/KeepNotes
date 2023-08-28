import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SideBar from '../helpers/sideBar/sideBar';
import TopNavigation from '../helpers/topNavigation/topNavigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

function Notification() {
  const [notification, setNotification] = useState([])
  const itemsPerPage= 6
  const [itemOffset,setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = notification.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(notification.length / itemsPerPage);
  const userData = useSelector((state) => state.dataSlice.userData)
  
  async function getNotifications() {
    try {
      const response = await axios.get('http://localhost:8001/getnotifications')
      console.log(response);
      setNotification(response.data.data)
    } catch (err) {
      console.log(`Could not fetch : ${err}`);
    }
  }
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % notification.length;

    setItemOffset(newOffset);

  };

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <div>
      <Row>
        <Col md="2">
          <SideBar name={userData.name} />
        </Col>
        <Col md="10">
          <TopNavigation />
          <div className=' pt-5 px-5' >

            <h4>Notifications</h4>
            {currentItems.map((message) => (
              <div>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      {message.notification}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br></br>
              </div>

            ))}

          {notification.length > 5 ?
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel="next >"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}

                          previousLabel="< previous"
                          renderOnZeroPageCount={null}
                          pageClassName="page-item text-dark"
                          pageLinkClassName="page-link text-dark"
                          previousClassName="page-item text-dark"
                          previousLinkClassName="page-link text-dark"
                          nextClassName="page-item text-dark"
                          nextLinkClassName="page-link text-dark"
                          breakClassName="page-item text-dark"
                          breakLinkClassName="page-link text-dark"
                          containerClassName="pagination "
                          activeClassName="active"

                        />
                        : <div></div>
                      }
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Notification