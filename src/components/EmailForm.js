import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

const EmailForm = (props) => {
    const [emailAddress, setEmailAddress] = useState('')

    const handleChange = (e) => {
        setEmailAddress(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.submitHandler(emailAddress)
    }

    return (
        <React.Fragment>
            <Form.Group>
                <InputGroup hasValidation>
                    <Form.FloatingLabel label='Enter your email' className="mb-3" >
                        <Form.Control
                            type='text'
                            name='email'
                            value={emailAddress}
                            onChange={handleChange}
                            disabled={props.emailIsValid}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Email cannot be empty!
                        </Form.Control.Feedback>
                    </Form.FloatingLabel>
                </InputGroup>
            </Form.Group>
            <Button type='submit' hidden={props.emailIsValid || props.otpConfirmed} onClick={submitHandler} variant='outline-success' disabled={props.buttonLoading}>
                {
                    props.buttonLoading ?
                        (
                            <>
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                <span className="">Loading...</span>
                            </>
                        ) :
                        ['Send OTP']
                }
            </Button>
        </React.Fragment>
    )
}

export default EmailForm