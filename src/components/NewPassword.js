import React, { useState } from 'react'
import {Form, InputGroup, Button} from 'react-bootstrap'

const NewPassword = (props) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    
    const submitHandler = async (e) => {
        setButtonLoading(true)
        e.preventDefault()
        try {
            if (newPassword === confirmNewPassword) {
                await props.setnewpasswordhandler(newPassword)
                setButtonLoading(false)
            } else {
                setButtonLoading(false)
                throw new Error("Password didn't match!")
            }
        } catch (error) {
            props.seterrcode('001')
            props.seterrmessage("Password didn't match!")
            props.triggererrmodal()
        }
        setButtonLoading(false)
    }

    return (
        <React.Fragment>
            <Form.Group>
                <InputGroup hasValidation>
                    <Form.FloatingLabel label='Set new password' className="mb-3" >
                        <Form.Control
                            type='password'
                            name='newPassword'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Field cannot be empty!
                        </Form.Control.Feedback>
                    </Form.FloatingLabel>
                </InputGroup>
                <InputGroup hasValidation>
                    <Form.FloatingLabel label='Confirm your password' className="mb-3" >
                        <Form.Control
                            type='password'
                            name='newPassword'
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Filed cannot be empty!
                        </Form.Control.Feedback>
                    </Form.FloatingLabel>
                </InputGroup>
            </Form.Group>
            <Button type='submit'  onClick={submitHandler} variant='outline-success' disabled={buttonLoading}>
                {
                    buttonLoading ?
                        (
                            <>
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                <span className="">Loading...</span>
                            </>
                        ) :
                        ['Set New Password']
                }
            </Button>
        </React.Fragment>
    )
}

export default NewPassword