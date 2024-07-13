import React, { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaSearch, FaComments, FaBell, FaTh, FaUser, FaAngleDown } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';

import { AuthContext } from "../AuthContext";

const Navbar = () => {
  // const user = useSelector(state => state.Auth.user); // Adjusted to correctly access user information
  const [showDropdown, setShowDropdown] = useState(false);
  const { setAuth, logout,auth } = useContext(AuthContext);
  const navigate = useNavigate();
  
 
  // const dispatch=useDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  
  const handleLogout = async () => {
    try {
        await logout();
        setAuth(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

  const handleUpdate = () => {
    navigate('/problems/update/:id');
  };
  const handleAdd = () => {
    navigate('/problems/create');
  };
  const handleContests=()=>{
    navigate('/contests/create');
  }
  return (
    <nav className="bg-gray-900 px-6 py-3 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4">
        <img className="h-14 w-auto" src="https://static.vecteezy.com/system/resources/previews/022/142/244/non_2x/modern-technology-pixel-code-program-logo-design-digital-coding-software-logo-vector.jpg" alt="Your Company Logo" />
        <Link
          to="/"
          className={`text-white hover:text-yellow-300 pb-1 }`}
        >
          Home
        </Link>
        <Link
          to="/problems/problemset"
          className={`text-white hover:text-yellow-300 pb-1 }`}
        >
          Problems
        </Link>
        
        <Link
          to="/contests/allcontests"
          className={`text-white hover:text-yellow-300 pb-1 }`}
        >
          Compete
        </Link>
        <Link
          to="/blogs"
          className={`text-white hover:text-yellow-300 pb-1 }`}
        >
          Blogs
        </Link>
        {auth && auth.role === 'admin' && (
          <>
          <button
              onClick={handleAdd}
              className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
            >
              Add Problem
            </button>
            {/* <button
              onClick={handleUpdate}
              className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
            >
              Update Problem
            </button> */}
            <button
              onClick={handleContests}
              className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
            >
              Create Contest
            </button>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        
        <FaComments className="text-white hover:text-yellow-300 cursor-pointer" />
        <FaBell className="text-white hover:text-yellow-300 cursor-pointer" />
        <FaTh className="text-white hover:text-yellow-300 cursor-pointer" />
        <button className="text-green-700 hover:bg-gray-100 p-2 rounded cursor-pointer logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
        
          <Link to="/getprofile"
          className={`text-sky-blue hover:text-red-300 pb-1}`}><FaUser className="text-white hover:text-yellow-300" /></Link>
          
            
          
          <FaAngleDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      
    </nav>
  );
};

export default Navbar;
