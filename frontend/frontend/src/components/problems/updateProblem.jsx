import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const UpdatedProblem=()=>{
    const {id}=useParams();
    const [problemid,setProblemID]=useState(0);
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [difficulty,setDifficulty]=useState('');
    const [submissions,setSubmissions]=useState(0);
    const [marks,setMarks]=useState(0);
    const [constraints,setConstraints]=useState('');
    const [inputFormat,setInputFormat]=useState('');
    const [outputFormat,setOutputFormat]=useState('');
    const [sampleInput,setSampleInput]=useState('');
    const [sampleOutput,setSampleOutput]=useState('');
    const [topics,setTopics]=useState('');
    const [testcase,setTestcase]=useState('');
   

    
    useEffect(()=>{
        const fetchProblem=async()=>{
            try{
                const response=await axios.get(`http://localhost:4000/problems/problem/${id}`);
                const problemData=response.data.data.data  //// Assuming data is structured as { status: 'Success', data: { problem details } }

                setProblemID(problemData.problemid);
                setTitle(problemData.title);
                setDescription(problemData.description);
                setDifficulty(problemData.difficulty);
                setSubmissions(problemData.submissions)
                setMarks(problemData.marks)
                setConstraints(problemData.constraints)
                setInputFormat(problemData.inputFormat)
                setOutputFormat(problemData.outputFormat)
                setSampleInput(problemData.sampleInput)
                setSampleOutput(problemData.sampleOutput)
                setTopics(problemData.topics)
                setTestcase(problemData.testcase)

            }catch(err){
                console.err('Error fetching problem details:',err);

            }
        };
        if(id){
            fetchProblem();
        }
    },[id]);

    // FUCTION TO HANDLE FORM SUBMISSION AND UPDATE PROBLEM

    const updProblem=()=>{
        const UpdatedProblem={
            problemid,
            title,
            description,
            difficulty,
            submissions,
            marks,
            constraints,
            inputFormat,
            outputFormat,
            sampleInput,
            sampleOutput,
            topics,
            testcase,
            
        };
        axios.put(`http://localhost:4000/problems/update/${id}`,UpdatedProblem)
        .then(response=>{
            console.log('Problem updated successfullly:',response.data)

        })
    
    .catch(error=>{
        console.log('Error updating problem:',error);

    });

   };

   return (
    <div>
        <input type="number" value={problemid} onChange={(e)=>setProblemID(e.target.value)} placeholder="Problem ID"/>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"/>
        <input type="text" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} placeholder="Difficulty"/>
        <input type="number" value={submissions} onChange={(e)=>setSubmissions(e.target.value)} placeholder="Submssions"/>

        <input type="number" value={marks} onChange={(e)=>setMarks(e.target.value)} placeholder="Marks"/>
        <input type="text" value={constraints} onChange={(e)=>setConstraints(e.target.value)} placeholder="Constraints"/>
        <input type="text" value={inputFormat} onChange={(e)=>setInputFormat(e.target.value)} placeholder="Input Format"/>
        <input type="text" value={outputFormat} onChange={(e)=>setOutputFormat(e.target.value)} placeholder="Output Format"/>
        <input type="text" value={sampleInput} onChange={(e)=>setSampleInput(e.target.value)} placeholder="Sample Input"/>
        <input type="text" value={sampleOutput} onChange={(e)=>setSampleOutput(e.target.value)} placeholder="Sample Output"/>
        <input type="text" value={topics} onChange={(e)=>setTopics(e.target.value)} placeholder="Topics"/>
        <input type="text" value={testcase} onChange={(e)=>setTopics(e.target.value)} placeholder="Testcase"/>

        <button onClick={updProblem}>Update Problem</button> 

    </div>
   );
};
export default UpdatedProblem;
