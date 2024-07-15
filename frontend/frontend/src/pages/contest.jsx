// src/components/ContestPage.js

import React from 'react';
import Timer from '../components/contests/timer';
import trophyImage from '../assets/trophy.png';
import weeklyContestImage from '../assets/weekly_contest.jpg';
import biweeklyContestImage from '../assets/biweekly_contest.jpg';
import featuredContest1Image from '../assets/featured_contest_1.jpg';
import featuredContest2Image from '../assets/featured_contest_2.jpg';
import featuredContest3Image from '../assets/featured_contest_3.jpg';
import Navbar from '../components/navbar';

const ContestPage = () => {
  const weeklyContestEndTime = new Date("2024-06-30T23:59:59");
  const biweeklyContestEndTime = new Date("2024-07-07T23:59:59");
  const featuredContestEndTimes = [
    new Date("2024-07-14T23:59:59"),
    new Date("2024-07-21T23:59:59"),
    new Date("2024-07-28T23:59:59")
  ];

  return (
    <div>
      <Navbar/>
    
    <div className="container mx-auto p-4">
      <div className="text-center">
        <img src={"https://media.istockphoto.com/id/507158863/photo/gold-trophy-cup.jpg?s=1024x1024&w=is&k=20&c=qqsiCS6jTzfYrzeTS6NqpAdd2_ls8d-nT7PTsZqZ3Ak="} alt="Trophy" className="w-80 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Contest</h1>
        <p className="text-lg mb-6">Contest every week. Compete and see your ranking.</p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Weekly Contest</h2>
          <img src={"https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"} alt="Weekly Contest" className="w-64 h-40 object-cover mx-auto mb-2" />
          <Timer endTime={weeklyContestEndTime} />
          <a href="/weekly_contest" className="text-blue-500 hover:underline">View Contest Details</a>
          <button className="block mt-2 text-blue-500 hover:underline">Add to Google Calendar</button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Biweekly Contest</h2>
          <img src={"https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png"} alt="Biweekly Contest" className="w-64 h-40 object-cover mx-auto mb-2" />
          <Timer endTime={biweeklyContestEndTime} />
          <a href="/biweekly_contest" className="text-blue-500 hover:underline">View Contest Details</a>
          <button className="block mt-2 text-blue-500 hover:underline">Add to Google Calendar</button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center">Featured Contests</h2>
      <div className="flex justify-center space-x-4 mb-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Featured Contest 1</h3>
          <img src={"https://assets.leetcode.com/contest/weekly-contest-291/card_img_1654267951.png"} alt="Featured Contest 1" className="w-64 h-40 object-cover mx-auto mb-2" />
          <Timer endTime={featuredContestEndTimes[0]} />
          <a href="/featured_contest_1" className="text-blue-500 hover:underline">View Contest Details</a>
          <button className="block mt-2 text-blue-500 hover:underline">Add to Google Calendar</button>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Featured Contest 2</h3>
          <img src={"https://images.unsplash.com/photo-1517433456452-f9633a875f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzUzM3wwfDF8c2VhcmNofDd8fHByb2dyYW1taW5nfGVufDB8fHx8MTY2NTUyMTA1Ng&ixlib=rb-1.2.1&q=80&w=400"} alt="Featured Contest 2" className="w-64 h-40 object-cover mx-auto mb-2" />
          <Timer endTime={featuredContestEndTimes[1]} />
          <a href="/featured_contest_2" className="text-blue-500 hover:underline">View Contest Details</a>
          <button className="block mt-2 text-blue-500 hover:underline">Add to Google Calendar</button>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Featured Contest 3</h3>
          <img src={"https://assets.leetcode.com/contest/biweekly-contest-85/card_img_1659801683.png"} alt="Featured Contest 3" className="w-64 h-40 object-cover mx-auto mb-2" />
          <Timer endTime={featuredContestEndTimes[2]} />
          <a href="/featured_contest_3" className="text-blue-500 hover:underline">View Contest Details</a>
          <button className="block mt-2 text-blue-500 hover:underline">Add to Google Calendar</button>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="w-1/2 pr-2">
          <h2 className="text-3xl font-bold mb-4">Past Contests</h2>
          <ol className="list-decimal list-inside">
            <li><a href="/past_contest_1" className="text-blue-500 hover:underline">Past Contest 1</a></li>
            <li><a href="/past_contest_2" className="text-blue-500 hover:underline">Past Contest 2</a></li>
            <li><a href="/past_contest_3" className="text-blue-500 hover:underline">Past Contest 3</a></li>
            <li><a href="/past_contest_4" className="text-blue-500 hover:underline">Past Contest 4</a></li>
            <li><a href="/past_contest_5" className="text-blue-500 hover:underline">Past Contest 5</a></li>
            <li><a href="/past_contest_6" className="text-blue-500 hover:underline">Past Contest 6</a></li>
            <li><a href="/past_contest_7" className="text-blue-500 hover:underline">Past Contest 7</a></li>
            <li><a href="/past_contest_8" className="text-blue-500 hover:underline">Past Contest 8</a></li>
            <li><a href="/past_contest_9" className="text-blue-500 hover:underline">Past Contest 9</a></li>
            <li><a href="/past_contest_10" className="text-blue-500 hover:underline">Past Contest 10</a></li>
          </ol>
        </div>
        <div className="w-1/2 pl-2">
          <h2 className="text-3xl font-bold mb-4">My Contests</h2>
          <ol className="list-decimal list-inside">
            <li><a href="/my_contest_1" className="text-blue-500 hover:underline">My Contest 1</a></li>
            <li><a href="/my_contest_2" className="text-blue-500 hover:underline">My Contest 2</a></li>
            <li><a href="/my_contest_3" className="text-blue-500 hover:underline">My Contest 3</a></li>
            <li><a href="/my_contest_4" className="text-blue-500 hover:underline">My Contest 4</a></li>
            <li><a href="/my_contest_5" className="text-blue-500 hover:underline">My Contest 5</a></li>
            <li><a href="/my_contest_6" className="text-blue-500 hover:underline">My Contest 6</a></li>
            <li><a href="/my_contest_7" className="text-blue-500 hover:underline">My Contest 7</a></li>
            <li><a href="/my_contest_8" className="text-blue-500 hover:underline">My Contest 8</a></li>
            <li><a href="/my_contest_9" className="text-blue-500 hover:underline">My Contest 9</a></li>
            <li><a href="/my_contest_10" className="text-blue-500 hover:underline">My Contest 10</a></li>
          </ol>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContestPage;
