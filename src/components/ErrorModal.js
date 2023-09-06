import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';

const ErrorModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    const handleHide = () => {
        setShow(false)
    }

    useImperativeHandle(ref, () => ({
        handleShow,
        handleHide
    }))

    return ReactDOM.createPortal(
        <Modal
            {...props}
            size="md"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={'static'}
            autoFocus={true}
        >
            <Modal.Header className='justify-content-center'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i className="d-flex bi bi-x-circle-fill text-danger" style={{ fontSize: 60, marginTop: -30 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <h4>RC: {props.errcode}</h4>
                <p className='text-dark'>
                    {props.errmessage}
                </p>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button onClick={handleHide} variant='danger' size='md'>Close</Button>
            </Modal.Footer>
        </Modal>
        ,
        document.getElementById('modal-root')
    )
})

export default ErrorModal