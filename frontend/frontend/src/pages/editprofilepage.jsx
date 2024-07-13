import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/navbar'

function EditProfilePage(){
    const [userData,setUserData]=useState({
    name: '',
    gender: '',
    location: '',
    birthday: '',
    summary: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    work: '',
    education: '',
    skills: ''
    });
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get('/api/user-data')
        .then(response=>{
            setUserData({
                ...response.data,
                skills:response.data.skills?.join(', ') || ''
            });
        })
        .catch(error =>{
            console.log('Error fetching user data:', error);
        });

    },[]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUserData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        const updateData={
            ...userData,
            skills:userData.skills.split(',').map(skill=>skill.trim()),
        };
        axios.post('/api/update-user', updatedData)
            .then(() => {
                navigate('/');
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    };

    return (
        <div>
            <Navbar/>

        <div className="container mx-auto my-8 p-4 bg-white shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{userData.name}</h1>
            <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Basic Info</h2>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Name:</label>
                    <input type="text" name="name" value={userData.name} onChange={handleChange} className="border px-2 py-1 w-full"/>

                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Gender:</label>
                    <input type="text" name="gender" value={userData.gender} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Location:</label>
                    <input type="text" name="location" value={userData.location} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Birthday:</label>
                    <input type="date" name="birthday" value={userData.birthday} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Summary:</label>
                    <textarea name="summary" value={userData.summary} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
        
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Website:</label>
                    <input type="url" name="website" value={userData.website} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">GitHub:</label>
                    <input type="url" name="github" value={userData.github} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">LinkedIn:</label>
                    <input type="url" name="linkedin" value={userData.linkedin} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Twitter:</label>
                    <input type="url" name="twitter" value={userData.twitter} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Education:</label>
                    <input type="text" name="education" value={userData.education} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Work Experience:</label>
                    <input type="text" name="workExperience" value={userData.workExperience} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Skills:</label>
                    <input type="text" name="skills" value={userData.skills} onChange={handleChange} className="border px-2 py-1 w-full"/>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Save</button>
            </form>
        </div>
        </div>
    );

}
export default EditProfilePage;