import React, { useEffect } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { NavLink, useLocation } from 'react-router-dom';

function Breadcrumbs() {
    const location = useLocation()

    const parts = location.pathname.split('/').filter(element => element)

    return (
        <Breadcrumb className='my-3 mx-2'>
            <Breadcrumb.Item active={false} >
                <span className={'text-dark text-uppercase text-decoration-none'}>
                    {window.location.hostname}
                </span>
            </Breadcrumb.Item>
            {
                parts.map((part, index) => (
                    <Breadcrumb.Item key={index}>
                        <NavLink to={`/${part}`} className={'text-dark text-uppercase text-decoration-none'}>
                            {part}
                        </NavLink>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs