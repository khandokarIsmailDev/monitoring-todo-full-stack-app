import { useContext, useEffect, useState } from "react";
import TodoAdd from "./TodoAdd";
import Todo from "./Todo";
import OnProgress from "./OnProgress";
import Done from "./Done";
import Revised from "./Revised";
import { TodoContext } from "../../context";

export default function TodoBoard() {
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

  console.log("this is todoList", todoList);
  console.log("this is todoAll for context", todoAll);
  return (
    <div className="mx-auto max-w-7xl p-6">
      <TodoAdd />
      <div className="-mx-2 mb-6 flex flex-wrap">
        <Todo tasks={todoList.todo} />
        <OnProgress tasks ={todoList.inprogress} />
        <Done tasks={todoList.done} />
        <Revised tasks={todoList.revised} />
      </div>
    </div>
  );
}
