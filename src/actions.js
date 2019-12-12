export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODO'

export const addTodo = todoTitle => {
    const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 1000000000),
        title: todoTitle,
        completed: false
      };
    return {
        type: ADD_TODO,
        payload: newTodo
    }
}
export const toggleTodo = () => {
    return {
        type: TOGGLE_TODO
    }
}
export const deleteTodo = () => {
    return {
        type: DELETE_TODO
    }
}
export const clearCompletedTodos = () => {
    return {
        type: CLEAR_COMPLETED_TODOS
    }
}