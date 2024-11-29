const initialState = {
    todoAll:[]
}

const TodoReducer = (state,action) => {
    switch(action.type){
        case "SET_TODO_ALL":
            return {...state,todoAll:action.payload};
        case "EDIT_TASK":
            return {...state,
                todoAll:state.todoAll.map(todo => todo.id === action.payload.id ? action.payload : todo)
            };
        default:
            return state;
    }
}

export {
    initialState,
    TodoReducer
}