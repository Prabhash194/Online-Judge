import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../url';
import Home from "./home";
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../AuthContext'

const Login = () => {
    // const user = useSelector((state) => state.Auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [value,setValue]=useState('');

    const {login,auth}=useContext(AuthContext);
    
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await post('/login', { email, password });
    //         const { data, status } = response;
    //         if (status === 200) {
    //             const { user, message } = data;
    //             navigate("/", { replace: true });
    //             toast.success(message);
    //             // dispatch(SetUser(user));
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         toast.error('Failed to login. Please try again.');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.log("checking login",err);
            alert("Failed to log in");
        }
    };
    useEffect(() => {
        if (auth?.loggedIn) {
            navigate("/");
        }
    }, [auth?.loggedIn, navigate]);

    

    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-20 py-4 bg-gray-100 shadow-md">
                
                <h3><Link to="/register">Register</Link></h3>
            </div>

            <div className="w-full flex justify-center items-center h-[80vh] bg-gray-200">
                <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[30%] bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-left">Log in to your account</h1>
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Log in
                        </button>
                        {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
                    </form>
                    <div className="flex justify-center items-center space-x-3">
                        <p>New here?</p>
                        <p className="text-blue-500 hover:underline"><Link to="/register">Register</Link></p>
                    </div>
                    
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
