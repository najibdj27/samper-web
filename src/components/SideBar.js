import React from 'react'
import './../stylesheets/SideBarExample.css'
import { NavLink, useLocation } from 'react-router-dom'

function SideBar() {
    const location = useLocation()

    const menu = [
        {
            'name': 'menu-dashboard',
            'display_name': 'Dashboard',
            'disable': false,
            'icon_class': 'bi-clipboard-data',
            'url': '/dashboard'
        },
        {
            'name': 'menu-data',
            'display_name': 'Data',
            'disable': false,
            'icon_class': 'bi-database',
            'url': '/data'
        },
        {
            'name': 'menu-report',
            'display_name': 'Report',
            'disable': false,
            'icon_class': 'bi-file-earmark-arrow-down',
            'url': '/report'
        },
        {
            'name': 'menu-app-management',
            'display_name': 'App Management',
            'disable': false,
            'icon_class': 'bi-card-list',
            'url': '/appmanagement'
        }
    ]

    return (
        <React.Fragment>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary min-vh-100 col-2 sticky-top">
                <div className='my-2 mx-auto'>
                    <img
                        alt=""
                        src="https://www.zarla.com/images/zarla-s-1x1-2400x2400-20211119-wwrwkmmjcm7hh3wfkvcc.png?crop=1:1,smart&width=250&dpr=2"
                        width="30"
                        height="30"
                        className="align-top"
                        style={{ marginRight: -5, color: '#ffffffff' }}
                    />
                    amper ADMIN
                </div>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    {
                        menu.map((m, index) => (
                            location.pathname.startsWith(m.url)?
                            (
                                <li key={index} className="nav-item">
                                    <NavLink to={m.url} className="nav-link" aria-current="page">
                                        <i className={`bi ${m.icon_class} me-2`} width={16} height={16} />
                                        {m.display_name}
                                    </NavLink>
                                </li>
                            ):
                            (
                                <li key={index} className="nav-item">
                                    <NavLink to={m.url} className="nav-link link-body-emphasis">
                                        <i className={`bi ${m.icon_class} me-2`} width={16} height={16} />
                                        {m.display_name}
                                    </NavLink>
                                </li>
                            )
                        ))
                    }
                </ul>
                <hr />
                <ul className='nav nav-pills flex-column '>
                    <li className='nav-item'>
                        <i className="bi bi-gear me-2" width={16} height={16}>
                        </i>
                        Settings
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SideBar