import React, { useState,useContext } from "react";
import { TodoContext } from "../../context";
import { formatDateToYYYYMMDD } from "../../utils/timeFormat";
import { toast } from "react-toastify";


export default function Modal({onShowModal,editTask,setEditTask}) {

  const {state,dispatch} = useContext(TodoContext);

  const [task, setTask] = useState(editTask || {
    taskName: "",
    description: "",
    dueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: "todo",
  });





  function handleCloseModal() {
    setEditTask(null);
    onShowModal(false);
  }

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "dueDate") {
      const date = new Date(value);
      value = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // console.log(name, value);
    setTask({
      ...task,
      [name]: value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    
    // Fetch backend URL from config.json
    let backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
      const configResponse = await fetch('/config.json');
      const config = await configResponse.json();
      if (config.VITE_BACKEND_URL) {
        backendUrl = config.VITE_BACKEND_URL; 
      }
    } catch (configError) {
      console.warn('Could not load config.json, using env variable');
    }

    // Validation: Check if any field is empty
    if (!task.taskName || !task.description || !task.dueDate || !task.category) {
        toast.error("Please fill in all fields.");
        return; // Exit the function if validation fails
    }

    if(editTask){
      dispatch({type:"EDIT_TASK",payload:task});
      const response = await fetch(`${backendUrl}/todos`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
      })
      const data = await response.json();
      console.log('this is data from modal',data);
      toast.success("Task updated successfully.");
    }else{
      dispatch({type:"SET_TODO_ALL",payload:[...state.todoAll,task]})
      const response = await fetch(`${backendUrl}/todos`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
      })
      const data = await response.json();
      console.log('this is data from modal',data);
      toast.success("Task created successfully.");
    }
    setEditTask(null);
    onShowModal(false);
  }

  console.log('this is task from modal', task);
  console.log('this is todoAll from modal', state.todoAll);

  return (
    <div className="w-full h-screen  absolute flex top-0 left-0 justify-center items-center  bg-black bg-opacity-50">
      <div className="w-full  max-w-md rounded-lg bg-gray-800 shadow-xl ">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            {editTask ? "Edit Task" : "Create Task"}
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                required=""
                defaultValue={editTask?.taskName}
                onChange={(e) => handleChange(e)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={editTask?.description}
                onChange={(e) => handleChange(e)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                min={new Date().toISOString().split("T")[0]}
                defaultValue={editTask ? formatDateToYYYYMMDD(editTask.dueDate) : new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')}
                onChange={(e) => handleChange(e)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                onChange={(e) => handleChange(e)}
                defaultValue={editTask?.category}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="todo">To-Do</option>
                <option value="inprogress">On Progress</option>
                <option value="done">Done</option>
                <option value="revised">Revised</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={(e) => handleSubmit(e)}
              >
                {editTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
