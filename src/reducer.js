import todosList from "./todos.json";
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_COMPLETED_TODOS} from './actions'


const initialState ={
    todos: todosList
  };

//skeleton
const todosReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_TODO:{
             //immutability pattern--don't modify an existing version of the data
      //create a copy

      //you can use spread syntax instead of slice
      //const newTodoList = [...this.state.todos]
      const newTodoList = state.todos.slice();
      //modify the copy
      newTodoList.push(action.payload);

      //overwrite the original with the modified copy

      return { todos: newTodoList };}

        case DELETE_TODO:
        case TOGGLE_TODO:
        case CLEAR_COMPLETED_TODOS:{
             //copy the state to be modified

    const newTodoList =state.todos.filter(todo => {
        //expecting you to return either true or false
        if (todo.completed === true) {
          return false;
        }
        return true;
      });
  
      //overwrite the original with copy
      return { todos: newTodoList };}

        default:
            return state;
    }
}

export default todosReducer