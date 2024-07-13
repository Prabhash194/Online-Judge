import React, { useContext, useState } from "react";
import ContestContext from "./contestContext";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const FetchContest = () => {
    console.log("checking to fetch contests");
    const { contests } = useContext(ContestContext);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    if (!contests || contests.length === 0) {
        return <div>Loading...</div>;
    }
    

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="container mx-auto bg-white p-4 mt-6 rounded-lg shadow-md">
                
                <h2 className="text-2xl font-bold">Contests</h2>
                    
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contest Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contests.map((contest) => (
                                <tr key={contest._id}>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        <Link to={`/contests/allcontests`}>{contest.contest_name}</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contest.start_time).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contest.end_time).toLocaleString()}</td>
                                    
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FetchContest;
