import React, { useContext, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import Todo from "./Todo";
import OnProgress from "./OnProgress";
import Done from "./Done";
import Revised from "./Revised";
import { TodoContext } from "../../context";
import { someTask } from "../../data/some-task";

export default function TodoBoard() {
  const { todo,setTodo } = useContext(TodoContext);

  useEffect(() => {
    setTodo(someTask);
  }, []);

  console.log(todo);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <TodoAdd />
      <div className="-mx-2 mb-6 flex flex-wrap">
        {
          todo.map((task) => (
            <>
              {task.category === "todo" && <Todo task={task} />}
              {task.category === "inprogress" && <OnProgress task={task} />}
              {task.category === "done" && <Done task={task} />}
              {task.category === "revised" && <Revised task={task} />}
            </>
          ))
        }

      </div>
    </div>
  );
}
  