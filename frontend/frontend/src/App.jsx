import { useState } from 'react'
import {Route,Routes,Router} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import { Provider } from 'react-redux';
import Admin from './pages/admin'

import ProblemDetail from './components/problems/problemDetails';
import UpdatedProblem from './components/problems/updateProblem';
import ProblemForm from './components/problems/problemForm';

import Dashboard from "./pages/dashboard";
import Blogs from "./pages/blogs";
import ProtectedRoute from './pages/ProtectedRoute';

import Profile from "./pages/profile";
import EditProfilePage from './pages/editprofilepage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import FetchProblem from './components/problems/fetchProblem';
import Problem from './components/problems/Problem';
import ProblemProvider from './components/problems/problemProvider';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ContestForm from './components/contests/contestForm';
import ContestPage from './components/contests/Contest';
import FetchContest from './components/contests/fetchContests';

import './App.css'
import { AuthProvider } from './AuthContext';



const App=() =>{
  

  return (
    <AuthProvider>
      

       

      <Routes>
        

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        
        <Route path="/admin" element={ <ProtectedRoute roles={["admin"]}><Admin /></ProtectedRoute>}/>


        <Route path="/" element={ <Home />}/>
        
        <Route path="/*" element={ <ProtectedRoute><Home /></ProtectedRoute>}/>
        

        <Route path="/problems/problemset" element={ <ProtectedRoute><FetchProblem /></ProtectedRoute>}/>
        
        <Route path="/problems/problem/:id" element={ <ProtectedRoute><ProblemDetail /></ProtectedRoute>}/>
        <Route path="/problems/update/:id" element={ <ProtectedRoute roles={["admin"]}><UpdatedProblem/></ProtectedRoute>}/>

        <Route path="/problems/create" element={ <ProtectedRoute roles={["admin"]}><ProblemForm /></ProtectedRoute>}/>

        
        <Route path="/contests/create" element={ <ProtectedRoute roles={["admin"]}><ContestForm /></ProtectedRoute>}/>
        <Route path="/contests/allcontests" element={ <ProtectedRoute><FetchContest /></ProtectedRoute>}/>
        <Route path="/contests/:id" element={ <ProtectedRoute><contestDetails /></ProtectedRoute>}/>

        
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/getprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>


      
    
    
   
   
    </AuthProvider>
  );
};

export default App;
