import React, { useContext ,useState} from "react";
import Page from "./Page";
import { TodoContext } from "./context";

export default function App() {

  const [todo,setTodo] = useState([])

  return (
    <div>
      <TodoContext.Provider value={{ todo, setTodo }}>
        <Page />
      </TodoContext.Provider>
    </div>
  );
}
