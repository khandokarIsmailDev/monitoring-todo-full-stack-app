import React, { useContext, useState } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import TodoBoard from "./components/todos/TodoBoard";
import { ModalContext } from "./context";
import Modal from "./components/todos/Modal";


export default function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {showModal && <Modal />}
      <div className="bg-gray-900 text-white">
        <div className="flex h-screen">
          <SideBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Header />
            <TodoBoard />
          </main>
        </div>
      </div>
    </ModalContext.Provider>
  );
}
