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
        // Try to load config first
        let backendUrl = import.meta.env.VITE_BACKEND_URL;
        
        try {
          const configResponse = await fetch('/config.json');
          const config = await configResponse.json();
          if (config.VITE_BACKEND_URL) {
            backendUrl = config.VITE_BACKEND_URL;
          }
        } catch (configError) {
          console.warn('Could not load config.json, using env variable');
        }
  
        console.log('Using Backend URL:', backendUrl);
  
        const response = await fetch(`${backendUrl}/todos`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        dispatch({ type: 'SET_TODO_ALL', payload: data.todos });
      } catch (error) {
        console.error("Error fetching todos:", error);
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
