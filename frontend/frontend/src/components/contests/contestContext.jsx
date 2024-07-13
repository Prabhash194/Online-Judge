import { createContext } from "react";

const ContestContext=createContext({
    contests:[],
    addContest:()=>{},
    addProblemToContest:()=>{},
    setContests:()=>{},
    
});
export default ContestContext;