import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList

  };

  handleToggleTodo = (event, todoIdToToggle) => {
    console.log ('checkbox was clicked')

      //creates a copy and modify the copy with map
      const newTodoList = this.state.todos.map(todo => {
        if( todo.id === todoIdToToggle) {

          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      //overwrite the original with the modified copy

      this.setState({ todos: newTodoList });


  };


  handleCreateTodo = event => {
    //use public class syntax to permanently bind this to App

    if(event.key === 'Enter') {
      const newTodo = {
        "userId": 1,
        "id": Math.floor(Math.random() * 1000000000),
        "title": event.target.value,
        "completed": false
      };
      //immutability pattern--don't modify an existing version of the data
      //create a copy

      //you can use spread syntax instead of slice
      //const newTodoList = [...this.state.todos]
      const newTodoList = this.state.todos.slice()
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
            onKeyDown = {this.handleCreateTodo}
          />
        </header>
        <TodoList handleToggleTodo = {this.handleToggleTodo} todos={this.state.todos} />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange = {event => this.props.handleToggleTodo(event, this.props.id)
            }
          />
          <label>{this.props.title}</label>
          <button className="destroy" />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem handleToggleTodo  = {this.props.handleToggleTodo} title={todo.title} completed={todo.completed}
            id = {todo.id} />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
