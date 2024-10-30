import React,{useContext,useState} from "react";
import { TodoContext } from "../context";

export default function Search() {

  const {todoAll,setTodoAll} = useContext(TodoContext);
  const [search,setSearch] = useState([]);

  // console.log("todoAll in search",todoAll);

  const [storeTodoAll,setStoreTodoAll] = useState(todoAll);

  function handleSearch(e){
    const searchValue = e.target.value;
    if(searchValue){
      const filteredTask = todoAll.filter((task)=>task.taskName.toLowerCase().includes(searchValue.toLowerCase()));
      if (filteredTask.length > 0) {
        setTodoAll(filteredTask);
      } else {
        setTodoAll(storeTodoAll);
      }
    }else{
      setTodoAll(storeTodoAll);
    }
  }

  console.log("search",todoAll);

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
