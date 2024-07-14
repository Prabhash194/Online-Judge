import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import ProblemForm from '../problems/problemForm'
import ContestContext from './contestContext';
import Navbar from '../navbar';

const ContestForm = () => {
  console.log("this is contest form page");
  const [contest_name,setContest_Name]=useState('');
  const [problems,setProblems]=useState([]);
  const [start_time,setStart_Time]=useState('');
  const [end_time,setEnd_Time]=useState('');

  const {addContest,addProblemToContest}=useContext(ContestContext);
  

  const handleSubmit=async(e)=>{
    
    e.preventDefault();
    try{
      console.log("checking to create contests")
      const response=await axios.post('https://backend.online-judge.store/contests/create',{
        contest_name,
        problems,
        start_time,
        end_time
        
      });
      if (response.data && response.data.success) {
        addContest(response.data.contest);
        toast.success('Contest added successfully!');

        setContest_Name('');
        setProblems([]);
        setStart_Time('');
        setEnd_Time('');
    } else {
        console.error('API response does not indicate success:', response.data);
        toast.error('Error adding contest');
    }
} catch (error) {
    console.log('Error adding contests', error);
    toast.error('Error adding contest');
}
  };

  

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
            <h1 className="text-2xl font-bold mb-6">Add New contest</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="contest_name" className="block text-sm font-medium text-gray-700">Contest Name</label>
                    <input type="string" id="contest_name" value={contest_name} onChange={(e) => setContest_Name(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" required />
                </div>
                

                <div>
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input type="datetime-local" id="start_time" value={start_time} onChange={(e) => setStart_Time(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" required/>
                </div>

                <div>
                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input type="datetime-local" id="end_time" value={end_time} onChange={(e) => setEnd_Time(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" required/>
                </div>

                <button type="submit" className="w-full py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-md shadow-sm">Add New Contest</button>

            </form>
            <ProblemForm onProblemAdd={addProblemToContest}/>
        </div>
   
    
  );
};

export default ContestForm;
