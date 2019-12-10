import todosList from "./todos.json";


const initialState ={
    todos: todosList
  };

//skeleton
const todosReducer = (state = initialState, action) =>{
    switch (action.type) {
        // case 'ADD_TODO':
        default:
            return state;
    }
}

export default todosReducer