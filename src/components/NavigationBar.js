import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import './../stylesheets/NavigationBar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useAuth } from '../auth';
import { NavLink } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';


function NavigationBar({props}) {
    const auth = useAuth()
    const logoutHandler = () => {
        auth.logout()
    }

    return (
        <Navbar bg='light' data-bs-theme='light' expand="lg" className="bg-body-tertiary sticky-top px-0 mx-0">
            <Navbar.Collapse id="navbarScroll">
                <div className='d-flex mx-auto'>
                    <Form className="d-flex">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
            </Navbar.Collapse>
            <Dropdown 
                as={ButtonGroup}
                className="d-inline mx-3"
                align={'end'}
                drop={'down'}
            >
                <Button variant='outline-dark'>
                    <Image src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" style={{width: 20, height: 20}} className='me-1' roundedCircle />
                    {auth.user.sub} 
                </Button>
                <Dropdown.Toggle variant='outline-dark'></Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>
                        <NavLink className={'nav-link'} to={'/profile'}>Profile</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <NavLink className={'nav-link'} to={'/hirearcy'}>Hierarcy</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    );
}

export default NavigationBar