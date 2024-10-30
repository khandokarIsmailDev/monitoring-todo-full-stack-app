import React,{useContext,useState} from "react";
import { TodoContext,SearchContext } from "../context";

export default function Search() {

  const {todoAll} = useContext(TodoContext);
  const {search,setSearch} = useContext(SearchContext);

  // console.log("todoAll in search",todoAll);


  function handleSearch(e){
    const searchValue = e.target.value;
    setSearch(searchValue);
  }

  console.log("search",search);

  return (
    <div className="mx-4 flex-1">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search here"
        className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
      />
    </div>
  );
}
