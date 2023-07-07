import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const[users, setUsers] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const results = await axios.get("http://localhost:8080/api/get-users");
        setUsers(results.data);
    };

    const deleteUser = async (id) => {
        const message = await axios.delete(`http://localhost:8080/api/delete-user/${id}`);
        console.log(message.data);
        loadUsers();
    };

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/viewuser/${user.id}`} className='btn btn-primary mx-2'>View</Link>
                                    <Link to={`/edituser/${user.id}`} className='btn btn-outline-primary mx-2'>Edit</Link>
                                    <button onClick={()=>deleteUser(user.id)} className='btn btn-danger mx-2'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}