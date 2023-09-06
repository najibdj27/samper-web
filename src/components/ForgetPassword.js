import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import ErrorModal from './ErrorModal'
import './../stylesheets/ForgetPassword.css'
import ConfirmOTP from './ConfirmOTP'
import EmailForm from './EmailForm'
import NewPassword from './NewPassword'
import { useNavigate } from 'react-router-dom'
import InfoModal from './InfoModal'

const ForgetPassword = () => {
    const [emailAddress, setEmailAddress] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [otpConfirmed, setOtpConfirmed] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [changePasswordToken, setChangePasswordToken] = useState('')
    const [errCode, setErrCode] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [withAdditional, setWithAdditional] = useState(false)
    const [infoTittle, setInfoTittle] = useState('')
    const [infoMessage, setInfoMessage] = useState('')

    const errorModalRef = useRef(null)
    const infoModalRef = useRef(null)
    const navigate = useNavigate()

    const confirmOTPHanlder = async (intOtp) => {
        await axios.post('http://localhost:8080/auth/confirmotp', {
            "emailAddress": emailAddress,
            "otp": intOtp
        }).then(response => {
            setChangePasswordToken(response.data.data.resetPasswordToken)
            setEmailIsValid(false)
            setOtpConfirmed(true)
            setInfoTittle('OTP Confirmation')
            setInfoMessage(response.data.message)
            infoModalRef.current?.handleShow()
        }).catch(err => {
            setErrCode(err.response.data.error_code)
            setErrMessage(err.response.data.error_message)
            errorModalRef.current?.handleShow()
        })
    }

    const sendOTPHandler = async (emailAddress) => {
        setButtonLoading(true)
        await axios.post('http://localhost:8080/auth/forgetpassword', { emailAddress })
            .then(response => {
                setEmailAddress(emailAddress)
                setEmailIsValid(true)
                setButtonLoading(false)
                setInfoTittle('Send OTP')
                setInfoMessage(response.data.message)
                infoModalRef.current?.handleShow()
            }).catch(err => {
                setErrCode(err.response.data.error_code)
                setErrMessage(err.response.data.error_message)
                setButtonLoading(false)
                errorModalRef.current?.handleShow()
            })
    }

    const setNewPasswordHandler = async (newPassword) => {
        await axios.patch('http://localhost:8080/auth/reset_password', {
            newPassword: newPassword
        }, {
                params: {
                    token: changePasswordToken
                }
            }
        ).then(response => {
            setWithAdditional(true)
            setInfoTittle('Set New Password')
            setInfoMessage(response.data.message)
            infoModalRef.current?.handleShow()
        }).catch(err => {
            setErrCode(err.response.data.error_code)
            setErrMessage(err.response.data.error_message)
        })
    }

    return (
        <React.Fragment>
            <Container>
                <Row className='justify-content-md-center min-vh-100'>
                    <Col xs={6} className='my-auto'>
                        <Card className="text-center" variant={'white'}>
                            <Card.Header className='fw-bold' style={{ fontSize: 28 }}>
                                Forget Password
                            </Card.Header>
                            <Card.Body>
                                <Form className='mx-auto'>
                                    <EmailForm
                                        emailIsValid={emailIsValid}
                                        otpConfirmed={otpConfirmed}
                                        submitHandler={sendOTPHandler}
                                        buttonLoading={buttonLoading}
                                    />
                                    {
                                        emailIsValid ?
                                            (
                                                <ConfirmOTP
                                                    emailIsValid={emailIsValid}
                                                    emailAddress={emailAddress}
                                                    handleConfirmOTP={(intOtp) => confirmOTPHanlder(intOtp)}
                                                    hanldeResendOTP={(emailAddress) => sendOTPHandler(emailAddress)}
                                                />
                                            ) :
                                            otpConfirmed ?
                                                (
                                                    <NewPassword
                                                        seterrcode={(c) => setErrCode(c)}
                                                        seterrmessage={(m) => setErrMessage(m)}
                                                        triggererrmodal={() => {infoModalRef.current?.handleShow()}}
                                                        setnewpasswordhandler={setNewPasswordHandler}
                                                    />
                                                ) :
                                                null
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ErrorModal
                ref={errorModalRef}
                errcode={errCode}
                errmessage={errMessage}
            />
            <InfoModal
                ref={infoModalRef}
                infotittle={infoTittle}
                infomessage={infoMessage}
                withadditional={withAdditional}
                additionalhidehandler={() => {navigate('/login')}}
            />
        </React.Fragment>
    )
}

export default ForgetPassword