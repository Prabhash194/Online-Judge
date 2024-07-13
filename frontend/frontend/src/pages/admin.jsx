import React, { useEffect, useState } from 'react'

import  { toast } from 'react-hot-toast';
import './admin.css';
export default function Admin() {
  const [users,setUsers]=useState([])


  useEffect(()=>{
         const fetchUsers=async()=>{
          try {
                 const request= await axios.get("http://localhoat:4000/users",{withCredentials:true});
                 setUsers(response.data);
                 
          } catch (error) {
            console.error("Error fetching users:", error);
          }
         }
         fetchUsers();
  },[])

  
  return (
    <div className="admin-container">
            <h1>All Users</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Post Count</th>
                        <th>Account Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.postCount}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}