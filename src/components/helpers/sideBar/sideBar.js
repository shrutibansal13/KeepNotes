import { CDBSidebar, CDBSidebarHeader, CDBSidebarFooter, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact'
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowDown } from 'react-bootstrap-icons'
import { labelActivation } from '../../../redux/slice/dataSlice'

function SideBar(props) {
    const pages = useSelector((state) => state.dataSlice.allowedRoutes)
    const userDetails = useSelector((state) => state.dataSlice.userData)
    const labelActivate = useSelector((state) => state.dataSlice.labelActivate)
    const [showlabels, setShowLabels] = useState([])
    const dispatch=  useDispatch()
    const navigate=  useNavigate()

    const [title, setTitle] = useState([])

    async function getPermissionsData() {
        try {
            const response = await axios.get('http://localhost:8001/getpermissions')
            console.log(response.data.data, "perrrrrrrrrrr");
            // setTitle()
        }
        catch (err) {
            console.log(`Could not fetch ${err}`);
        }
    }

    function conversion() {
     
        let items = pages.map((page) => (
            page.split('/')
        ))
        setTitle(items)
    }


    async function getlabels() {
        const result = await axios.get('http://localhost:8001/getlabels?' + new URLSearchParams({
            "id": userDetails._id
        }))
        setShowLabels(result.data.data)

    }


    async function handleLabel(val){
      console.log(val,"vallll???????");
        
        dispatch(labelActivation(val))
    }

    useEffect(() => {
        getPermissionsData();
        conversion()
        getlabels()
    }, [])

    return (
        <div>

            <div style={{ display: 'flex', height: '100vh' }}>
                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader >
                        Hello, {props.name}!
                    </CDBSidebarHeader>

                    <CDBSidebarContent >
                        <CDBSidebarMenu>

                            {title.map((page) => (
                                <Link to={`/${page[1]}`}>
                                    <CDBSidebarMenuItem >{page[1]}</CDBSidebarMenuItem>
                                </Link>

                            ))}


                       {showlabels.length!==0? <CDBSidebarMenuItem><h5>Labels &#62;</h5></CDBSidebarMenuItem>
                       :<></>
                       }
                        {showlabels.map((item, index )=>(
                           <Link to={'/editlabels'} onClick={()=>handleLabel(item.labels)}>
                            <CDBSidebarMenuItem >{item.labels}</CDBSidebarMenuItem>
                            </Link>
                        ))}
                          

                        </CDBSidebarMenu>
                    </CDBSidebarContent >


                </CDBSidebar>
            </div>

        </div>
    )
}

export default SideBar