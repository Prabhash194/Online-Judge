import React, { useContext, useState, } from "react";
import { useDispatch } from "react-redux";
import ProblemContext from "./problemContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import { FaSort } from "react-icons/fa";

const FetchProblem = () => {
    const { problems } = useContext(ProblemContext);
    const [sortConfig,setSortConfig]=useState({key:null,direction:'ascending'});
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [showTopics, setShowTopics] = useState(true);

    if (!problems || problems.length === 0) {
        return <div>Loading...</div>;
    }
   

    

    
    // const currentPage = location.pathname.split('/').pop();

    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.post('/logout');
    //         if (response.status === 200) {
    //             dispatch(Logout());
    //             navigate('/login');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="container mx-auto bg-white p-4 mt-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Problems</h2>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={showTopics}
                            onChange={() => setShowTopics(!showTopics)}
                        />
                        <span className="ml-2 text-gray-700">Show Topics</span>
                    </label>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                {showTopics && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topics</th>}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {problems.map((problem) => (
                                <tr key={problem._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.problemid}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        <Link to={`/problems/problem/${problem._id}`}>{problem.title}</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.difficulty}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.submissions}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.marks}</td>
                                    {showTopics && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {Array.isArray(problem.topics) ? problem.topics.join(', ') : problem.topics}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FetchProblem;
