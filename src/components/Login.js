import React, { useRef, useState } from 'react'
import './../stylesheets/Login.css'
import { useAuth } from '../auth'
import { Form, InputGroup } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorModal from './ErrorModal'
import axios from 'axios'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errCode, setErrCode] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [validated, setValidated] = useState(false)

    const errorModalRef = useRef()
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/dashboard'

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/signin', {username, password})
            .then(response => {
                auth.login(response.data.data.accessToken)
                navigate(redirectPath, {replace: true})
            }).catch(err => {
                setErrCode(err.response.data.error_code)
                setErrMessage(err.response.data.error_message)
                setValidated(true)
                errorModalRef.current?.handleShow()
            })
    }

    return (
        <React.Fragment>
            <div className="d-lg-flex half">
                <div className="bg order-1 order-md-2 m-auto" style={{ backgroundImage: "url('https://simantap.unper.ac.id/images/unper.png')", width: 400, height: 400 }}>
                </div>
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <h3>Login to <strong>Samper ADMIN</strong></h3>
                                <p className="mb-4">Sistem Absensi Mahasiswa Universitas Perjuangan</p>
                                <Form onSubmit={(e) => submitHandler(e)} noValidate validated={validated}>
                                    <Form.Group className="form-group first">
                                        <Form.FloatingLabel htmlFor="username">Username</Form.FloatingLabel>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type="text"
                                                placeholder="your.email@unper.ac.id"
                                                name='username'
                                                value={username}
                                                onChange={(e) => { setUsername(e.target.value) }}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Username can not be empty!
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="form-group last mb-3">
                                        <Form.FloatingLabel htmlFor="password">Password</Form.FloatingLabel>
                                        <InputGroup>
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                placeholder="Your Password"
                                                id="password"
                                                name='password'
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value) }}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errMessage}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <div className="d-flex mb-5 align-items-center">
                                        <span className="ms-auto">
                                            <Link to="/forgetpassword" className="forgot-pass">Forget Password</Link>
                                        </span>
                                    </div>
                                    <button type="submit" className="btn btn-block btn-primary" >
                                        Log In
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorModal ref={errorModalRef} errcode={errCode} errmessage={errMessage} />
        </React.Fragment>
    )
}
