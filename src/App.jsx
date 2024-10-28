import React, { useContext ,useState} from "react";
import Page from "./Page";
import { TodoContext } from "./context";
import { someTask } from "./data/some-task";

export default function App() {

  const [todoAll,setTodoAll] = useState(someTask)


  return (
    <div>
      <TodoContext.Provider value={{ todoAll, setTodoAll }}>
        <Page />
      </TodoContext.Provider>
    </div>
  );
}
