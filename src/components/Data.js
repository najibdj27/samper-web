import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useAuth } from '../auth'
import NavigationBar from './NavigationBar'
import { Col, Container, Row } from 'react-bootstrap'
import Breadcrumbs from './Breadcrumbs'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Data = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [dataList, setDataList] = useState([])

    const getDataList = async () => {
        await axios.get('http://localhost:8080/adminprevillage/getbycurrentadmin',
            { headers: { "Authorization": `Bearer ${auth.user[0].token}` } }
        ).then(response => {
            setDataList(response.data.data)
        }).catch(err => {
            console.log('error')
            // setErrCode(err.response.data.error_code)
            // setErrMessage(err.response.data.error_message)
        })

    }

    useEffect(() => {
        getDataList()
    }, [])

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <SideBar auth={auth} />
                    <Col xs={10} className='px-0'>
                        <NavigationBar auth={auth} />
                        <Row className='m-0 p-3'>
                            <Row className='m-0'>
                                <Breadcrumbs />
                            </Row>
                            <Row className='m-0'>
                                {
                                    location.pathname === '/data' ?
                                        (
                                            <Accordion flush>
                                                {
                                                    dataList.map((data, index) => (
                                                        <Accordion.Item key={index} eventKey={index}>
                                                            <Accordion.Header className='fw-bold text-capitalize'>{data.nameDisplay}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="d-grid gap-2">
                                                                    <h5>
                                                                        Description:
                                                                    </h5>
                                                                    {data.description}
                                                                    <Button className='mt-3 col-6 mx-auto' onClick={() => navigate(data.nameDb)} variant="primary" size="lg">
                                                                        Open
                                                                    </Button>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))
                                                }
                                            </Accordion>
                                        ) :
                                        (
                                            <Outlet />
                                        )
                                }
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Data