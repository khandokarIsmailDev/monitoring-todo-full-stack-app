import { useState, useReducer, useEffect } from "react";
import Page from "./Page";
import { TodoContext, SearchContext } from "./context";
import { initialState, TodoReducer } from "./reducers/TodoReducers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [search, setSearch] = useState([]);
  const [state, dispatch] = useReducer(TodoReducer, { ...initialState, todoAll: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        console.log(data.todos);
        dispatch({ type: 'SET_TODO_ALL', payload: data.todos });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TodoContext.Provider value={{ state, dispatch }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Page />
          <ToastContainer />
        </SearchContext.Provider>
      </TodoContext.Provider>
    </div>
  );
}
