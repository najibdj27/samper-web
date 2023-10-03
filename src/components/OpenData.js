import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { useAuth } from '../auth'
import { Button, Card, NavLink, OverlayTrigger, Popover, Row, Form } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

const OpenData = () => {
    const auth = useAuth()
    const params = useParams()
    const [responseArr, setResponseArr] = useState()
    const [previllageData, setPrevillageData] = useState()
    const [errCode, setErrCode] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const dataName = params.dataName


    const getPrevilageData = async () => {
        try {
            const getPrevData = await axios.get('http://localhost:8080/adminprevillage/getbycurrentadmin',
                {
                    headers: { "Authorization": `Bearer ${auth.user[0].token}` },
                    params: {
                        name: dataName
                    }
                }
            )
            const prevData = getPrevData.data.data
            setPrevillageData(prevData)
            try {
                const getAllData = await axios.get(`http://localhost:8080${prevData[0]['url']}`,
                    {
                        headers: { "Authorization": `Bearer ${auth.user[0].token}` }
                    }
                )
                const allData = getAllData.data.data
                setResponseArr(allData)
            } catch (error) {
                setErrCode(error.data.error_code)
                setErrMessage(error.data.error_message)
            }
        } catch (err) {
            console.log(err.response.status)
            if (err.response.status === 401) {
                auth.logout()
            } else {
                setErrCode(err.data.error_code)
                setErrMessage(err.data.error_message)
            }
        }
    }

    const renderTooltip = (data, tittle) => (
        <Popover id="popover-basic" className='overflow-auto' style={{ maxWidth: '100%' }}>
            <Popover.Header as="h3" className='text-center text-uppercase'>{tittle}</Popover.Header>
            <Popover.Body>
                <Table striped bordered hover>
                    <tbody>
                        {
                            Object.entries(data).map(([k, v], index) => (
                                <tr key={index}>
                                    <td>{k}</td>
                                    <td>{v}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Popover.Body>
        </Popover>
    );

    useEffect(() => {
        getPrevilageData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Card className='p-3'>
                <Row className='mb-2'>
                    <Col lg={{span: 4, offset: 4}} className='me-auto'>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">
                                <i className="bi bi-search"></i>
                            </Button>
                        </Form>
                    </Col>
                    <Col lg='1' >
                        <Button variant="outline-success" className='me-0'>
                            <i className="bi bi-arrow-clockwise"></i>
                        </Button>
                    </Col>
                </Row>
                <Row className='overflow-scroll' style={{ maxHeight: '500px' }}>
                    <Table striped bordered hover className='overflow-scroll'>
                        <thead>
                            <tr>
                                <th className='text-center'>No</th>
                                {
                                    responseArr ?
                                        [
                                            Object.keys(responseArr[0]).map((key, index) => (
                                                <th key={index} className='text-center'>{key}</th>
                                            ))
                                        ] :
                                        (
                                            <th className='placeholder-wave'>
                                                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary'></div>
                                            </th>
                                        )
                                }
                                <th className='text-center' colSpan={previllageData ? Array.from(previllageData[0].previllages).length : 0}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                responseArr ?
                                    responseArr.map((response, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {
                                                Object.keys(responseArr[0]).map(key => [(
                                                    <td key={index} className='overflow-hidden text-nowrap'>
                                                        {
                                                            Array.isArray(response[key]) ?
                                                                Array.from(response[key]).map((v, index) => (
                                                                    response[key][index]
                                                                ))
                                                                :
                                                                typeof (response[key]) === 'object' ?
                                                                    (
                                                                        <span>
                                                                            {
                                                                                response[key]['id']
                                                                            }
                                                                            <OverlayTrigger
                                                                                placement="right"
                                                                                delay={{ show: 250, hide: 400 }}
                                                                                overlay={renderTooltip(response[key], key)}
                                                                            >
                                                                                <NavLink className='d-inline ms-2 fst-italic text-primary'>
                                                                                    <i className="bi bi-box-arrow-up-right"></i>
                                                                                </NavLink>
                                                                            </OverlayTrigger>
                                                                        </span>
                                                                    )
                                                                    :
                                                                    response[key]

                                                        }
                                                    </td>
                                                )])
                                            }
                                            {
                                                previllageData ?
                                                    [
                                                        Array.from(previllageData[0].previllages).includes('UPDATE') ?
                                                            (
                                                                <td className='text-center'>
                                                                    <Button variant='warning'>
                                                                        <i class="bi bi-pencil-square"></i>
                                                                    </Button>
                                                                </td>
                                                            )
                                                            :
                                                            null,
                                                        Array.from(previllageData[0].previllages).includes('DELETE') ?
                                                            (
                                                                <td className='text-center'>
                                                                    <Button variant='danger'>
                                                                        <i className="bi bi-trash" />
                                                                    </Button>
                                                                </td>
                                                            )
                                                            :
                                                            null,

                                                    ]
                                                    :
                                                    null
                                            }
                                        </tr>
                                    )) :
                                    (
                                        <tr>
                                            <td className='placeholder-wave'>
                                                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary'></div>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </Table>
                </Row>
            </Card>
        </React.Fragment>
    )
}

export default OpenData