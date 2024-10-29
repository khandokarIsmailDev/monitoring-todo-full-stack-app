import { useContext, useEffect, useState } from "react";
import TodoAdd from "./TodoAdd";
import Todo from "./Todo";
import OnProgress from "./OnProgress";
import Done from "./Done";
import Revised from "./Revised";
import Modal from "./Modal";
import { TodoContext } from "../../context";

export default function TodoBoard() {
  const [showModal, setShowModal] = useState(false);
  const { todoAll, setTodoAll } = useContext(TodoContext);
  const [todoList, setTodoList] = useState({
    todo: [],
    inprogress: [],
    done: [],
    revised: [],
  });

  useEffect(() => {
    const categoriyTask = {
      todo: [],
      inprogress: [],
      done: [],
      revised: [],
    };

    todoAll.forEach((task) => {
      for (const category of Object.keys(categoriyTask)) {
        if (task.category === category) {
          categoriyTask[category].push(task);
        }
      }
    });

    setTodoList(categoriyTask);
  }, [todoAll]);

  // console.log("this is todoList", todoList);
  // console.log("this is todoAll for context", todoAll);
  return (
    <>
      {showModal && <Modal onShowModal={setShowModal} />}
      <div className="mx-auto max-w-7xl p-6">
        <TodoAdd onShowModal={setShowModal} />
        <div className="-mx-2 mb-6 flex flex-wrap">
          {todoList.todo.length > 0 && <Todo tasks={todoList.todo} />}
          {todoList.inprogress.length > 0 && <OnProgress tasks={todoList.inprogress} />}
          {todoList.done.length > 0 && <Done tasks={todoList.done} />}
          {todoList.revised.length > 0 && <Revised tasks={todoList.revised} />}
        </div>
      </div>
    </>
  );
}
