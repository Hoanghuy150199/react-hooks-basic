import React, { useState } from "react";
import "./App.scss";
import TodoList from "./components/ToDoList";

function App() {
  const [todoList, setToDoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setToDoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React Hooks - TodoList</h1>
      {/* <ColorBox /> */}
      <TodoList todos={todoList} onToDoClick={handleTodoClick} />
    </div>
  );
}

export default App;
