import React, { useEffect, useState } from "react";
import queryString from "query-string";
import "./App.scss";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";
// import TodoList from "./components/TodoList";
// import TodoForm from "./components/TodoForm";

function App() {
  const [todoList, setToDoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 2,
    _totalRows: 5,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 5,
    title_like: "",
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);

        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("New page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setToDoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    console.log("Form submit: ", formValue);

    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setToDoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>React Hooks</h1>
      {/* <ColorBox /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onToDoClick={handleTodoClick} /> */}

      {/* <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}

      {showClock && <Clock />}
      <div>
        <button onClick={() => setShowClock(false)}>Hide clock</button>
        <button onClick={() => setShowClock(true)}>Show clock</button>
      </div>
    </div>
  );
}

export default App;
