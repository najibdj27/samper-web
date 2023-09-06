import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './../stylesheets/StudentTable.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentTable() {
    const [token] = useState(localStorage.getItem('token'));
    const [responseArr, setResponseArr] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fetchData = async () => {
        await axios.get('http://localhost:8080/student/all', 
        { headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
                setResponseArr(response.data.meta_data);
                setIsLoading(false);
            })
            .catch(err => {
                setErrMessage(err);
                localStorage.setItem('token', '')
                setIsLoading(false);
            })
    };

    const redirect = () => {
        if (localStorage.getItem('token') === '') {
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchData()
        console.log(token)
        redirect()
    }, []);

    const tableLoad = (
        <tr >
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
            <td className='placeholder-wave'>
                <div style={{ width: '100%' }} className='placeholder rounded placeholder-xs bg-secondary '></div>
            </td>
        </tr>)
    
    return (
        <div className='col-10 '>
            <h4 className='my-3 fw-bold'>Students</h4>
            <Table className='rounded'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>NIM</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Date Of Birth</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? 
                            tableLoad:
                            responseArr.length > 0 ?
                                responseArr.map((rsp, index) => (
                                    <tr key={rsp.user.id}>
                                        <td>{index + 1}</td>
                                        <td>{rsp.nim}</td>
                                        <td>{rsp.user.firstName}</td>
                                        <td>{rsp.user.lastName}</td>
                                        <td>{rsp.user.username}</td>
                                        <td>{rsp.user.email}</td>
                                        <td>{rsp.user.dateOfBirth}</td>
                                        <td>{rsp.user.phoneNumber}</td>
                                    </tr>
                                    )) :
                                        [alert(errMessage) ,tableLoad]
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default StudentTable