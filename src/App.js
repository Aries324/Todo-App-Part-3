import React, { Component } from "react";
import TodoList from "./TodoList";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
class App extends Component {
  state = {
    todos: todosList
  };

  handleClearCompletedTodos = event => {
    //copy the state to be modified

    const newTodoList = this.state.todos.filter(todo => {
      //expecting you to return either true or false
      if (todo.completed === true) {
        return false;
      }
      return true;
    });

    //overwrite the original with copy
    this.setState({ todos: newTodoList });
  };

  handleDeleteTodo = (event, todoIdToDelete) => {
    //copy the state to be modified

    const newTodoList = this.state.todos.filter(todo => {
      //expecting you to return either true or false
      if (todo.id === todoIdToDelete) {
        return false;
      }
      return true;
    });

    //overwrite the original with copy
    this.setState({ todos: newTodoList });
  };

  handleToggleTodo = (event, todoIdToToggle) => {
    //creates a copy and modify the copy with map
    const newTodoList = this.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    //overwrite the original with the modified copy

    this.setState({ todos: newTodoList });
  };

  handleCreateTodo = event => {
    //use public class syntax to permanently bind this to App

    if (event.key === "Enter") {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 1000000000),
        title: event.target.value,
        completed: false
      };
      //immutability pattern--don't modify an existing version of the data
      //create a copy

      //you can use spread syntax instead of slice
      //const newTodoList = [...this.state.todos]
      const newTodoList = this.state.todos.slice();
      //modify the copy
      newTodoList.push(newTodo);

      //overwrite the original with the modified copy

      this.setState({ todos: newTodoList });

      event.target.value = "";
    }
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.handleCreateTodo}
          />
        </header>
        <Route exact path="/">
          <TodoList
            handleToggleTodo={this.handleToggleTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos}
          />
        </Route>
        <Route exact path="/active">
          <TodoList
            handleToggleTodo={this.handleToggleTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos.filter(todo => todo.completed === false)}
          />
        </Route>
        <Route exact path="/completed">
          <TodoList
            handleToggleTodo={this.handleToggleTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos.filter(todo => todo.completed === true)}
          />
        </Route>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {
                this.state.todos.filter(todo => {
                  if (todo.completed === false) {
                    return true;
                  }
                  return false;
                }).length
              }
            </strong>
            item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact activeClassName="selected" to="/">
                All
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="selected" to="/active">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="selected" to="/completed">
                Completed
              </NavLink>
            </li>
          </ul>
          <button
            onClick={this.handleClearCompletedTodos}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
