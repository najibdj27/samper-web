import React from 'react'
import { useAuth } from '../auth'
import { Col, Container, Row } from 'react-bootstrap'
import SideBar from './SideBar'
import NavigationBar from './NavigationBar'
import Breadcrumbs from './Breadcrumbs'

const Dashboard = () => {
    
    const auth = useAuth()

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <SideBar auth={auth} />
                    <Col xs={10} className='px-0'>
                        <NavigationBar auth={auth} />
                        <Row className='m-0 p-3'>
                            <Breadcrumbs />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Dashboard