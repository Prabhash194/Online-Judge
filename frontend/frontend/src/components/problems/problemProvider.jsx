import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProblemContext from './problemContext';

const ProblemProvider=({children})=>{
    const [problems,setProblems]=useState([]);

    useEffect(()=>{
        console.log("this is problem provider page");
        const fetchProblems=async()=>{

            try{
                console.log("Fetching Problem");
                const response=await axios.get("https://backend.online-judge.store/problems/problemset");
                console.log('API Response:',response.data);

                // CORRECTLY ACCESSING THE PROBLEM ARRAY

                if(response.data && response.data.status==='Success' && 
                    Array.isArray(response.data.data.savedGetProblem)
                    

                )
                
                {
                    console.log("response data:",response.data.data.savedGetProblem)
                    setProblems(response.data.data.savedGetProblem);
                }else{
                    console.error('API response does not contain an array of problems:',response.data);

                }

            }catch(error){
                console.log('Error fetching problems:', error);
            }
        };
        fetchProblems();
    },[]);

    const addProblem=(newProblem)=>{
        console.log("Adding problem:",newProblem);
        setProblems((prevProblems)=>[...prevProblems,newProblem]);
    };
    return (
        <ProblemContext.Provider value={{problems,addProblem}}>
            {children}
        </ProblemContext.Provider>
    );
};
export default ProblemProvider;