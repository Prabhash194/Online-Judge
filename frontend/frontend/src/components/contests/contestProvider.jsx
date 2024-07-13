import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContestContext from "./contestContext";

const ContestProvider=({children})=>{
    console.log("checking contest provider")
    const [contests,setContests]=useState([]);

    useEffect(()=>{
        console.log("this is contest provider page");
        const fetchContests=async()=>{
            try{
                console.log("Fetching Contests");
                const response=await axios.get("http://localhost:4000/contests/allcontests");
                console.log('API response',response.data);

                // correctly access the contest array

                if(response.data && response.data.success && Array.isArray(response.data.contests)
                ){
                    setContests(response.data.contests);
                }else{
                    console.error('API response does not contain an array of contests:',response.data);
                }
            }catch(error){
                console.error('Error fetching contests:',error);
            }

        };
        fetchContests();
    },[]);

    const addContest=(newContest)=>{
        console.log("Adding contest:",newContest);
        setContests((prevContests)=>[...prevContests,newContest]);
    };
    const addProblemToContest = (contestId, problems) => {
        setContests((prevContests) => 
            prevContests.map(contest =>
                contest._id === contestId
                    ? { ...contest, problems: [...contest.problems, problems._id] }
                    : contest
            )
        );
    };

    return (
        <ContestContext.Provider value={{contests,addContest,addProblemToContest}}>
            {children}
        </ContestContext.Provider>
    );

};

export default ContestProvider;