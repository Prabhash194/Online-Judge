import React from 'react';
import FetchContest from './fetchContests'; 

const ContestPage = () => {
  console.log("This is contests");
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Contests</h1>
      <div className="overflow-x-auto">
        {/* Render FetchProblem component here */}
        
        <FetchContest />
      </div>
    </div>
  );
};

export default ContestPage;