import React, {useState} from "react";
import Navbar from '../components/navbar'
import { useDispatch } from "react-redux";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell,faUser,faComments,faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BlogPage = () => {
    const blogs = [
      {
        title: 'Practice',
        image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzUzM3wwfDF8c2VhcmNofDd8fHByb2dyYW1taW5nfGVufDB8fHx8MTY2NTUyMTA1Ng&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Prepare yourself for various kinds of programming challenges by solving practice problems of varying difficulty.',
      },
      {
        title: 'Compete',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzUzM3wwfDF8c2VhcmNofDN8fGNvbXBldGl0aW9ufGVufDB8fHx8MTYyNjE2ODk1MA&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Compete against other techies in our monthly programming contests, gain recognition, and win cool stuff. Coding contests begin on the first of every month.',
      },
      {
        title: 'Discuss',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzUzM3wwfDF8c2VhcmNofDJ8fGRpc2N1c3Npb258ZW58MHx8fHwxNjI2MTY5MDU0&ixlib=rb-1.2.1&q=80&w=400',
        description: 'Hang out with other coders, discuss algorithms, get your questions answered and be inspired.',
      },
    ];
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    

  //  const handleLogout = async () => {
  //       try {
  //           const response = await axios.post('/logout');
  //           if (response.status === 200) {
  //               dispatch(Logout());
  //               navigate('/login');
  //           }
  //       } catch (error) {
  //           console.log(error);
  //        }
  //   };
  
    return (
      <div className="app">
        <Navbar/>
      
    
      <div className="container mx-auto p-4">
      
        <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>
        <div className="flex justify-around">
          {blogs.map((blog, index) => (
            <div key={index} className="w-1/3 p-4 bg-white shadow-md rounded-lg">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p>{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };
  
  export default BlogPage;