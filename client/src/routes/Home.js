import React, { useContext, useEffect } from "react";
import AxiosApi from "../Api/AxiosApi";
import { Context } from "../Context/Context";
import BlankTodo from "../Components/BlankTodo";
import Todo from "../Components/Todo";

const Home = () => {
  const { todos, SetTodos } = useContext(Context);

  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await AxiosApi.get("/");
      console.log(response);
      SetTodos(response.data.data.todolist);
    };
    fetchTodoList();
  }, []);

  const todolistComponents = () => {
    const length = todos.length;
    var element = -1;
    var isFirstRow = true;
    const todoComponnet = [];

    if (length === 0) {
      return (
        <div key={1} className="row ">
          <BlankTodo key={-1} />
          <div className="col mt-4"></div>
          <div className="col mt-4"></div>
          <div className="col mt-4"></div>
          <div className="col mt-4"></div>
          <div className="col mt-4"></div>
        </div>
      );
    }

    for (let i = 0; i < length / 6 + 0.00000001; i++) {
      const singleTodo = [];
      for (let j = 0; j < 6; j++) {
        if (element > length - 1) {
          singleTodo.push(<div className="col mt-4"></div>);
        } else {
          isFirstRow
            ? singleTodo.push(<BlankTodo key={-1} />)
            : singleTodo.push(
                <Todo
                  key={todos[element].id}
                  id={todos[element].id}
                  title={todos[element].title}
                  date={todos[element].date}
                  tasks={todos[element].tasks}
                />
              );
          isFirstRow = false;
        }
        element++;
      }
      todoComponnet.push(
        <div key={1} className="row ">
          {singleTodo}
        </div>
      );
    }
    return todoComponnet;
  };

  return (
    <div key={1} className="container-fluid ">
      {todolistComponents()}
    </div>
  );
};

export default Home;
