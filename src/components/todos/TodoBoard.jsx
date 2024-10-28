import React from "react";
import TodoAdd from "./TodoAdd";
import Todo from "./Todo";
import OnProgress from "./OnProgress";
import Done from "./Done";
import Revised from "./Revised";

export default function TodoBoard() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <TodoAdd />
      <div className="-mx-2 mb-6 flex flex-wrap">
        <Todo />
        <OnProgress />
        <Done />
        <Revised />
      </div>
    </div>
  );
}
