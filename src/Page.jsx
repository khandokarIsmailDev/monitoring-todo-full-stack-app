import React from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import TodoBoard from "./components/todos/TodoBoard";

export default function Page() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Header />
          <TodoBoard />
        </main>
      </div>
    </div>
  );
}
