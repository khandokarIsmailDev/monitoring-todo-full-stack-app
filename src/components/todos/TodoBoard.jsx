import { useContext, useEffect, useState } from "react";
import TodoAdd from "./TodoAdd";
import Todo from "./Todo";
import OnProgress from "./OnProgress";
import Done from "./Done";
import Revised from "./Revised";
import Modal from "./Modal";
import { TodoContext,SearchContext } from "../../context";
import { toast } from "react-toastify";
export default function TodoBoard() {
  const [showModal, setShowModal] = useState(false);
  const { todoAll, setTodoAll } = useContext(TodoContext);
  const {search} = useContext(SearchContext);
  
  const [todoList, setTodoList] = useState({
    todo: [],
    inprogress: [],
    done: [],
    revised: [],
  });

  //for edit task
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const categoriyTask = {
      todo: [],
      inprogress: [],
      done: [],
      revised: [],
    };

    // Ensure search is a string before using toLowerCase
    const searchTerm = typeof search === 'string' ? search.toLowerCase() : '';

    // Filter tasks based on search input
    const filteredTasks = searchTerm && todoAll.some(task => task.taskName.toLowerCase().includes(searchTerm))
      ? todoAll.filter(task => task.taskName.toLowerCase().includes(searchTerm))
      : todoAll;

    filteredTasks.forEach((task) => {
      for (const category of Object.keys(categoriyTask)) {
        if (task.category === category) {
          categoriyTask[category].push(task);
        }
      }
    });

    setTodoList(categoriyTask);
  }, [todoAll, search]);

  function handleDeleteTask(taskId) {
    const deleteTodo = todoAll.filter((task) => task.id !== taskId);
    setTodoAll(deleteTodo);
    toast.success("Task deleted successfully.");
  }

  function handleEditTask(task) {
    setShowModal(true);
    setEditTask(task);
  }

  // console.log("this is todoList", todoList);
  // console.log("this is todoAll for context", todoAll);
  return (
    <>
      {showModal && <Modal onShowModal={setShowModal} editTask={editTask} setEditTask={setEditTask} />}
      <div className="mx-auto max-w-7xl p-6">
        <TodoAdd onShowModal={setShowModal} />
        <div className="-mx-2 mb-6 flex flex-wrap">
          {todoList.todo.length === 0 &&
          todoList.inprogress.length === 0 &&
          todoList.done.length === 0 &&
          todoList.revised.length === 0 ? (
            <p className="text-center text-3xl font-bold  text-zinc-400 mx-auto">
              Task List is empty!
            </p>
          ) : (
            <>
              {todoList.todo.length > 0 && (
                <Todo
                  tasks={todoList.todo}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              )}
              {todoList.inprogress.length > 0 && (
                <OnProgress
                  tasks={todoList.inprogress}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              )}
              {todoList.done.length > 0 && (
                <Done
                  tasks={todoList.done}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              )}
              {todoList.revised.length > 0 && (
                <Revised
                  tasks={todoList.revised}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
