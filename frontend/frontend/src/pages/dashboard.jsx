import React, {useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell,faUser,faComments,faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar";



const Dashboard = () => {
    return (
        <div>
            <Navbar/>
        
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
        </div>
    );
};

export default Dashboard;


