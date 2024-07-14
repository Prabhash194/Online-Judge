import React, { useState, useContext } from 'react';
import axios from 'axios';
import ProblemContext from './problemContext';

const ProblemForm = () => {
    console.log("this is problem form page");
    const [problemid, setProblemID] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [submissions, setSubmissions] = useState(0);
    const [marks, setMarks] = useState(0);
    const [constraints, setConstraints] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [sampleOutput, setSampleOutput] = useState('');
    const [topics, setTopics] = useState('');
    const [testcase, setTestcase] = useState('');
    const [output, setOutput] = useState('');

    const { addProblem } = useContext(ProblemContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://backend.online-judge.store/problems/create', {
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
                output,
                
            });
            addProblem(response.data);

            // Optionally reset form fields after successful submission
            setProblemID(0);
            setTitle('');
            setDescription('');
            setDifficulty('');
            setSubmissions(0);
            setMarks(0);
            setConstraints('');
            setInputFormat('');
            setOutputFormat('');
            setSampleInput('');
            setSampleOutput('');
            setTopics('');
            setTestcase('');
            setOutput('');
            
        } catch (error) {
            console.error('Error adding problem:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-6">Add New Problem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="problemid" className="block text-sm font-medium text-gray-700">Problem ID</label>
                    <input type="number" id="problemid" value={problemid} onChange={(e) => setProblemID(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
                        <option value="">Select Difficulty</option>
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="submissions" className="block text-sm font-medium text-gray-700">Submissions</label>
                    <input type="number" id="submissions" value={submissions} onChange={(e) => setSubmissions(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks</label>
                    <input type="number" id="marks" value={marks} onChange={(e) => setMarks(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                </div>

                

                <div>
                    <label htmlFor="constraints" className="block text-sm font-medium text-gray-700">Constraints</label>
                    <textarea id="constraints" value={constraints} onChange={(e) => setConstraints(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-700">Input Format</label>
                    <textarea id="inputFormat" value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700">Output Format</label>
                    <textarea id="outputFormat" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="sampleInput" className="block text-sm font-medium text-gray-700">Sample Input</label>
                    <textarea id="sampleInput" value={sampleInput} onChange={(e) => setSampleInput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="sampleOutput" className="block text-sm font-medium text-gray-700">Sample Output</label>
                    <textarea id="sampleOutput" value={sampleOutput} onChange={(e) => setSampleOutput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics</label>
                    <textarea id="topics" value={topics} onChange={(e) => setTopics(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <label htmlFor="testcase" className="block text-sm font-medium text-gray-700">Testcase</label>
                    <textarea id="testcase" value={testcase} onChange={(e) => setTestcase(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <label htmlFor="output" className="block text-sm font-medium text-gray-700">Output</label>
                    <textarea id="output" value={output} onChange={(e) => setOutput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>

                

                <button type="submit" className="w-full py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-md shadow-sm">Add New Problem</button>
            </form>
        </div>
    );
};

export default ProblemForm;
