import { createContext } from "react";

const ProblemContext=createContext({
    problems:[],
    addProblem:()=>{},
    setProblem:()=>{},
});
export default ProblemContext;