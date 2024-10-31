import  {useState,useReducer} from "react";
import Page from "./Page";
import { TodoContext,SearchContext } from "./context";
import { someTask } from "./data/some-task";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState,TodoReducer } from "./reducers/TodoReducers";
export default function App() {

  // const [todoAll,setTodoAll] = useState(someTask)
  const [search,setSearch] = useState([]);

  const [state,dispatch] = useReducer(TodoReducer, { ...initialState, todoAll: someTask });

  return (
    <div>
      <TodoContext.Provider value={{ state,dispatch }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Page />
          <ToastContainer />
        </SearchContext.Provider>
      </TodoContext.Provider>
    </div>
  );
}
