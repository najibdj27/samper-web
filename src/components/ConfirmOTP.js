import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from 'react-bootstrap'
import useCountDown from './useCountDown'
import './../stylesheets/ConfirmOTP.css'

const ConfirmOTP = (props) => {
    const [otp, setOtp] = useState([])
    const [emailAddress] = useState(props.emailAddress)
    const [confirmButtonLoading, setConfirmButtonLoading] = useState(false)
    const [resendButtonLoading, setResendButtonLoading] = useState(false)
    const inputRef = useRef(null)

    const { timeLeft, start } = useCountDown()

    useEffect(() => {
        start(60)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const changHandler = (e, index) => {
        const newOtp = [
            ...otp.slice(0, index),
            e.target.value,
            ...otp.slice(index + 1)
        ]
        setOtp(newOtp)
    }

    const confirmOTPHanlder = async (e) => {
        e.preventDefault()
        setConfirmButtonLoading(true)
        let n = ''
        otp.forEach((o) => {
            n = n + o
        })
        const intOTP = parseInt(n)
        await props.handleConfirmOTP(intOTP)
        setConfirmButtonLoading(false)
    }

    const resendOTPHanlder = async (e) => {
        e.preventDefault()
        setResendButtonLoading(true)
        await props.hanldeResendOTP(emailAddress)
        start(60)
    }

    const inputfocus = (e) => {
        const nextKey = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ArrowRight"]
        const prevKey = ["Backspace", "Delete", "ArrowLeft"]
        if (prevKey.includes(e.key)) {
            const prev = e.target.tabIndex - 1
            if (prev >= 0) {
                inputRef[prev].focus()
            }
        }
        else if (nextKey.includes(e.key)) {
            const next = e.target.tabIndex + 1
            if (next <= 5) {
                inputRef[next].focus()
            }
        }
    }

    return (
        <React.Fragment>
            <Form.Group hidden={!props.emailIsValid}>
                <Form.FloatingLabel>Input OTP</Form.FloatingLabel>
                <div className="otpContainer">

                    <input
                        name="otp1"
                        type="text"
                        autoComplete={'off'}
                        className="otpInput"
                        onChange={(e) => changHandler(e, 0)}
                        tabIndex={0} maxLength="1" onKeyUp={e => inputfocus(e)}
                        ref={ref => inputRef[0] = ref}
                        min={0}
                        max={9}
                    />
                    <input
                        name="otp2"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        onChange={(e) => changHandler(e, 1)}
                        tabIndex={1} maxLength="1" onKeyUp={e => inputfocus(e)}
                        ref={ref => inputRef[1] = ref}
                        min={0}
                        max={9}
                    />
                    <input
                        name="otp3"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        onChange={(e) => changHandler(e, 2)}
                        tabIndex={2} maxLength="1" onKeyUp={e => inputfocus(e)}
                        ref={ref => inputRef[2] = ref}
                        min={0}
                        max={9}
                    />
                    <input
                        name="otp4"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        onChange={(e) => changHandler(e, 3)}
                        tabIndex={3} maxLength="1" onKeyUp={e => inputfocus(e)}
                        ref={ref => inputRef[3] = ref}
                        min={0}
                        max={9}
                    />

                    <input
                        name="otp5"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        onChange={(e) => changHandler(e, 4)}
                        tabIndex={4} maxLength="1" onKeyUp={e => inputfocus(e)}
                        ref={ref => inputRef[4] = ref}
                        min={0}
                        max={9}
                    />
                    <input
                        name="otp6"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        onChange={(e) => changHandler(e, 5)}
                        tabIndex={5} maxLength="1" onKeyUp={e => inputfocus(e)}
                        ref={ref => inputRef[5] = ref}
                        min={0}
                        max={9}
                    />
                </div>
                <ButtonGroup>
                    <Button variant='outline-success' onClick={confirmOTPHanlder} >
                        {
                            confirmButtonLoading ?
                                (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        <span className="">Loading...</span>
                                    </>
                                ) :
                                ['Confirm OTP']
                        }
                    </Button>
                    <Button variant='outline-success' onClick={resendOTPHanlder} disabled={timeLeft > 0 ? true : resendButtonLoading ? true : false} >
                        {
                            timeLeft > 0 ?
                                `Resend OTP (${timeLeft})` :
                                resendButtonLoading ?
                                    (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            <span className="">Loading...</span>
                                        </>
                                    ) :
                                    ['ResendOTP']
                        }
                    </Button>
                </ButtonGroup>
            </Form.Group>
        </React.Fragment>
    )
}

export default ConfirmOTP