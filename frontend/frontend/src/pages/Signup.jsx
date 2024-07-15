import React, { useState,useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../url';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {register,auth}=useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // const handleRegister = async () => {
    //     try {
    //         const res = await axios.post(URL + "/register", { username, email, password });
    //         setUsername("");
    //         setEmail("");
    //         setPassword("");
    //         setError(false);
    //         navigate("/login");
    //         toast.success("Registration successful. Please log in.");
    //     } catch (err) {
    //         setError(true);
    //         console.log(err);
    //         toast.error("Registration failed. Please try again.");
    //     }
    // }
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email,username, password);
            navigate("/login");
            alert("User registered");
        } catch (err) {
            alert("User already exists");
        }
    };

    useEffect(() => {
        if (auth?.loggedIn) {
            navigate("/login");
        }
    }, [auth?.loggedIn, navigate]);

    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-20 py-4 bg-gray-100 shadow-md">
                
                <h3><Link to="/login">Login</Link></h3>
            </div>
            

            <div className="w-full flex justify-center items-center h-[80vh] bg-gray-200">
                <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[30%] bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-left">Create an account</h1>
                    <form onSubmit={handleRegister} className="w-full space-y-4">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Enter your username"
                        required
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Register
                    </button>
                    {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
                    </form>
                    <div className="flex justify-center items-center space-x-3">
                        <p>Already have an account?</p>
                        <p className="text-blue-500 hover:underline"><Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register;
