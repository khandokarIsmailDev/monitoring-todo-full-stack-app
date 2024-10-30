import  {useState} from "react";
import Page from "./Page";
import { TodoContext,SearchContext } from "./context";
import { someTask } from "./data/some-task";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [todoAll,setTodoAll] = useState(someTask)
  const [search,setSearch] = useState([]);

  return (
    <div>
      <TodoContext.Provider value={{ todoAll, setTodoAll }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Page />
          <ToastContainer />
        </SearchContext.Provider>
      </TodoContext.Provider>
    </div>
  );
}
