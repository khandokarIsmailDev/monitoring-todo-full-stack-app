import React, { useState, useEffect } from "react";



export default function Sort({tasks}) {

  const [sortTask, setSortTask] = useState([]);
  const [intialNumber,setIntialNumber] = useState(0);

  function handleSort(){

    if(intialNumber === 0){
      const sortedTask = [...tasks].sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate))
      setSortTask(sortedTask);
      setIntialNumber(1);
    }else{
      const sortedTask = [...tasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
      setSortTask(sortedTask);
      setIntialNumber(0);
    }

    console.log("sortedTask", sortTask);
  }

  return (
    <svg
      onClick={handleSort}
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l9 0" />
      <path d="M4 12l7 0" />
      <path d="M4 18l7 0" />
      <path d="M15 15l3 3l3 -3" />
      <path d="M18 6l0 12" />
    </svg>
  );
}
