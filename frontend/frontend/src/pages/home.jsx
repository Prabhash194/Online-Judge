import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import Navbar from '../components/navbar';
import Profile from "./profile";
import EditProfilePage from './editprofilepage';
import Problem from "../components/problems/Problem";
import BlogPage from "./blogs";
import ProblemDetail from "../components/problems/problemDetails";
import ProblemForm from "../components/problems/problemForm";
import UpdatedProblem from "../components/problems/updateProblem";
import FetchProblem from "../components/problems/fetchProblem";
import ContestForm from "../components/contests/contestForm";
import ContestPage from "../components/contests/Contest";
import FetchContest from "../components/contests/fetchContests";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from '../AuthContext'

import { useContext } from "react";

export default function Home() {
    
    const navigate = useNavigate();
    const {auth}=useContext(AuthContext);
    const location = useLocation();
    const { id } = useParams();
    const [userdata, setUserData] = useState(null);
    
    

    const [user, setUser] = useState('');

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

    const handleProbelm = () => {
      navigate('/problems/problemset');
    };
    if(auth?.username==null){
        navigate("/login");
    }

    // useEffect(() => {
    //     console.log("Auth state in Home:", auth);
    // }, [auth]);

    // if(loading){
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#f0f4f8',
                    padding: 0,
                    backgroundImage: 'linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)',
                }}
            >
                <Container maxWidth="lg" sx={{ flex: '1 0 auto' }}>
                    <Grid container spacing={4} alignItems="center" sx={{ minHeight: '100vh', paddingTop: 8, paddingBottom: 8 }}>
                        <Grid item xs={12} md={6} sx={{ animation: 'fadeIn 1s ease-out' }}>
                            <Typography variant="h2" component="h2" gutterBottom>
                                Welcome, {auth?.username}
                            </Typography>
                            <Typography variant="h5" component="p" gutterBottom>
                                Let's start coding and test your skills
                            </Typography>
                            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }} onClick={handleProbelm}>
                                Start Solving
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'slideIn 1s ease-out' }}>
                            <Box
                                sx={{
                                    border: '2px solid #ffffff', // White border
                                    borderRadius: '8px', // Rounded corners
                                    overflow: 'hidden', // Ensures image fits within border
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
                                }}
                            >
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/005/611/079/non_2x/businessman-designing-a-website-by-coding-on-a-desktop-computer-images-for-web-banners-free-vector.jpg"
                                    alt="Businessman designing a website"
                                    style={{ width: '100%', maxWidth: '400px', objectFit: 'cover', borderRadius: '6px' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Routes>
                
        <Route path="/problems/problemset" element={<FetchProblem />}/>
        <Route path="/problems/problem/:id" element={<ProblemDetail />}/>
        <Route path="/problems/update/:id" element={<UpdatedProblem/>}/>

        <Route path="/problems/create" element={<ProblemForm />}/>

        
        <Route path="/contests/create" element={<ContestForm />}/>
        <Route path="/contests/allcontests" element={<FetchContest />}/>
        <Route path="/contests/:id" element={ <contestDetails />}/>

        
        <Route path="/blogs" element={<BlogPage/>} />
        <Route path="/getprofile" element={<Profile />} />
                
            </Routes>
        </>
    );
}
