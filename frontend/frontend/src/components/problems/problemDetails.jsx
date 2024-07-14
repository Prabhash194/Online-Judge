import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { useParams,useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css'; // Use a theme closer to VS Code
import Split from 'react-split';
import { AuthContext } from '../../AuthContext';
const first=()=>toast.dark('Accepted',{
  className:'bg-success text-green',
  bodyClassName:'text-center',
  progressClassName:'bg-white'


});
const second=()=>toast.dark('Wrong Answer',{
  className: 'bg-danger text-red',
  bodyClassName: 'text-center',
  progressClassName: 'bg-white',

});
const getStatusClass = (status) => {
  return status === 'Accepted' ? 'bg-green-200' : 'bg-200';
};

const CodePopup = ({ code, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md w-3/4 max-w-lg">
        <pre className="overflow-auto max-h-80">{code}</pre>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 mt-4 rounded-md hover:bg-gray-400 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  );
};

const SubmissionRow = ({ submission }) => {
  
  const statusClass = getStatusClass(submission.status);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const { setAuth, logout,auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewCode = () => {
    setShowCodePopup(true);
  };
  
  const handleClosePopup = () => {
    setShowCodePopup(false);
  };
  console.log(submission.userId);
  return (
    <>
    <tr className={statusClass}>
      <td className="border px-4 py-2">{submission?.userId?.username || 'Loading'}</td>
      <td className="border px-4 py-2">{submission.language}</td>
      <td className="border px-4 py-2">{submission.status}</td>
      <td className="border px-4 py-2">{format(new Date(submission.createdAt), 'PPpp')}</td>
      <td className="border px-4 py-2">
          <button
            onClick={handleViewCode}
            className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none"
          >
            View Code
          </button>
        </td>
      </tr>
      {showCodePopup && (
        <CodePopup code={submission.code} onClose={handleClosePopup} />
      )}
    </>
  );
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(
    `#include <iostream>
    using namespace std;
    
    int main() {
      cout << "Hello World!";
      return 0;
    }`
  );
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [activeConsoleTab, setActiveConsoleTab] = useState('input');
  const [showConsoleOptions, setShowConsoleOptions] = useState(false);
  const [userId,setUserId]=useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [fetching, setFetching] = useState(true);
  const [mysubmissions, setMySubmissions] = useState([]);
  const [allsubmissions, setAllsubmissions] = useState([]);
  const [activeSection,setActiveSection]=useState('problem');

  
  

  const handleRun = async () => {
    const payload = {
      language: selectedLanguage,
      code,
      input
    };
    try {
      const { data } = await axios.post('https://backend.online-judge.store/submissions/run', payload);
      setOutput({message:data.output,color:'green'});
      setActiveConsoleTab('output');
      setShowConsoleOptions(true); // Ensure console options are visible when Run is clicked
    } catch (error) {
      console.log(error.response);
      setOutput('Error: Unable to run the code.');
      setActiveConsoleTab('output');
      setShowConsoleOptions(true); // Ensure console options are visible when an error occurs
    }
  };

  const handleSubmit = async () => {
    

    const payload = {
      userId:id,
      language: selectedLanguage,
      code,
      input,
      problemId:id
    };

    try {
      const { data } = await axios.post('https://backend.online-judge.store/submissions/submit', payload, { withCredentials: true });
      const statusMessage=data.data.submission.status==='Accepted' ? 'Accepted' : 'All testcases did not passed.';
      const statusColor=data.status==='Accepted' ? 'green' : 'red';

      setStatus({message:statusMessage,color:statusColor});
      setActiveConsoleTab('status');
      setShowConsoleOptions(true);
      await fetchSubmissions();
      
      if(data.status==='Accepted'){
        first();
      }else{
        second();
      }
    } catch (error) {
      console.log(error.response);
      setStatus('Error: Unable to get the verdict.');
      setActiveConsoleTab('status');
      setShowConsoleOptions(true); // Ensure console options are visible when an error occurs
    }
  };

 
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`https://backend.online-judge.store/problems/problem/${id}`);
        setProblem(response.data.data.problem);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setError('Error fetching problem data');
        setLoading(false);
      }
    };
    const fetchSubmissions=async()=>{
      try{
        const response=await axios.get(`https://backend.online-judge.store/submissions/${id}`);
        console.log('All submissions:',response.data);

        if(response.data.status==='Success'){
          const sortedSubmissions=response.data.data.submissions.sort(
            (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAllsubmissions(sortedSubmissions);
          
        }else{
          console.error('Failed to fetch submissions:',response.data);

        }
      }catch(error){
        console.error('Error Fetching submissions:',error);
      }
    };
    
useEffect(()=>{
    if (id) {
      fetchProblem();
      fetchSubmissions();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  if (!problem) {
    return <div className="text-center text-xl">No problem data available</div>;
  }

  // useEffect(()=>{
  //   const fetchSubmissions=async()=>{
  //     try{
  //       const response=await axios.get(`http://localhost:8000/submissions/allsubmissions`);
  //       console.log('All submissions:',response.data);

  //       if(response.data.success){
  //         const sortedSubmissions=(await response).data.submissions.sort(
  //           (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
  //         );
  //         setAllsubmissions(sortedSubmissions);
          
  //       }else{
  //         console.error('Failed to fetch submissions:',response.data);

  //       }
  //     }catch(error){
  //       console.error('Error Fetching submissions:',error);
  //     }
  //   };
  //   if(id){
  //     fetchSubmissions();
  //   }
  // },[id]);

  const InfoItem = ({ label, value }) => (
    <div className="mb-4">
      <strong className="block">{label}:</strong>
      <div>{value}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Split
        className="flex"
        sizes={[50, 50]}
        minSize={300}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        {/* Left panel for problem details */}
        <div className="problem-details p-4 bg-white rounded shadow-md overflow-auto">
          {/* Options above problem contents */}
          <div className="flex space-x-4 mb-4">
            <button className={`py-2 px-4 rounded bg-gray-300 ${activeSection==='problem' ? 'bg-blue-200 border-t border-r border-l rounded-t' : 'bg-gray-100'}`} onClick={()=>setActiveSection('problem')}>Problem</button>
            
            <button className={`py-2 px-4 rounded bg-gray-300 ${activeSection==='allsubmissions' ? 'bg-blue-200 border-t border-r border-l rounded-t' : 'bg-gray-100'}`} onClick={()=>setActiveSection('allsubmissions')}>All Submissions</button>
          </div>

          {/* Problem details */}
          {activeSection==='problem' && (
            <>
          <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
          <InfoItem label="Description" value={problem.description} />
          <InfoItem label="Difficulty" value={problem.difficulty} />
          <InfoItem label="Marks" value={problem.marks} />
          <InfoItem label="Constraints" value={problem.constraints} />
          <InfoItem label="Input Format" value={problem.inputFormat} />
          <InfoItem label="Output Format" value={problem.outputFormat} />
          <InfoItem label="Sample Input" value={problem.sampleInput} />
          <InfoItem label="Sample Output" value={problem.sampleOutput} />

          </>
          )}
          


          {activeSection === 'allsubmissions' && (
        <div>
        <h2 className="text-xl font-bold mb-4">All Submissions</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Language</th>
              <th className="border px-4 py-2">Verdict</th>
              <th className="border px-4 py-2">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {allsubmissions.length > 0 ? (
              allsubmissions.map((submission, index) => (
                <SubmissionRow key={index} submission={submission} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No submissions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
      </div>



        {/* Right panel for code editor */}
        <div className="code-editor p-4 rounded shadow-md relative">
          {/* Language dropdown */}
          <div className="mb-4">
            <label htmlFor="language" className="block font-medium text-lg text-gray-700">Select Language:</label>
            <select
              id="language"
              name="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Code editor */}
          <div className="bg-gray-800 shadow-md w-full h-screen mb-4" style={{ overflowY: 'auto' }}>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          outline: 'none',
          border: 'none',
          backgroundColor: '#2d2d2d',
          color: '#f8f8f2',
          height: '100%',
          width: '100%',
          overflowX: 'auto',
          whiteSpace: 'pre', // preserve whitespace formatting for long lines
        }}
      />
    </div>

          {/* Console, Run, Submit buttons */}
          <div className="mt-4 flex justify-between p-4 bg-gray-100 border-t border-gray-300 rounded-bl rounded-br">
            <button
              onClick={() => setShowConsoleOptions(!showConsoleOptions)}
              className="py-2 px-4 rounded bg-gray-500 text-white hover:bg-gray-700"
            >
              Console
            </button>
            <button
              onClick={handleRun}
              className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded bg-green-500 text-white hover:bg-green-700"
            >
              Submit
            </button>
          </div>

          {/* Console options */}
          {showConsoleOptions && (
            <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveConsoleTab('input')}
                  className={`py-2 px-4 rounded ${activeConsoleTab === 'input' ? 'bg-gray-100' : 'bg-white'} focus:outline-none`}
                >
                  Input
                </button>
                <button
                  onClick={() => setActiveConsoleTab('output')}
                  className={`py-2 px-4 rounded ${activeConsoleTab === 'output' ? 'bg-gray-100' : 'bg-white'} focus:outline-none`}
                >
                  Output
                </button>
                <button
                  onClick={() => setActiveConsoleTab('status')}
                  className={`py-2 px-4 rounded ${activeConsoleTab === 'status' ? 'bg-gray-100' : 'bg-white'} focus:outline-none`}
                >
                  Verdict
                </button>
              </div>
              {activeConsoleTab === 'input' && (
                <div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border rounded mt-2 h-64" // Increased height
                  ></textarea>
                </div>
              )}
              {activeConsoleTab === 'output' && (
                <div>
                  <textarea
                    value={output.message}
                    readOnly
                    className="w-full p-2 border rounded mt-2 bg-gray-200 h-64" // Increased height
                  ></textarea>
                </div>
              )}
              {activeConsoleTab === 'status' && (
                <div>
                  <p className="mt-2 p-2 border rounded bg-gray-200 h-64 overflow-auto">{status.message}</p> 
                </div>
              )}
            </div>
          )}
        </div>
      </Split>
    </div>
  );
};

export default ProblemDetail;
