import React, { forwardRef, useState, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const InfoModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    const handleHide = () => {
        setShow(false)
        if (props.withadditional){
            props.additionalhidehandler()
        }
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
                    <i className="d-flex bi bi-info-circle-fill text-primary" style={{ fontSize: 60, marginTop: -30 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <h4>{props.infotittle}</h4>
                <p>
                    {props.infomessage}
                </p>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button onClick={handleHide} variant='primary' size='md'>OK</Button>
            </Modal.Footer>
        </Modal>
        ,
        document.getElementById('modal-root')
    )
})

export default InfoModal