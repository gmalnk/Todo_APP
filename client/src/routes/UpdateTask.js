import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosApi from "../Api/AxiosApi";

const UpdateTask = () => {
  const [todo, setTodo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const navigate = useNavigate();
  //use params returns a object with all dynamic parameters present in the url as keys and there corresponding values
  const { id } = useParams();
  // console.log(typeof id);
  // console.log(id);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        // console.log(`/${id}`);
        const response = await AxiosApi.get(`/${id}`);
        // console.log(response);
        // console.log(response.data.data);
        setTodo(response.data.data.todoData);
        setTasks(response.data.data.tasksData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodoDetails();
    // console.log(data);
  }, [id]);

  const handleSave = () => {
    handleTitle();

    navigate("/");
  };

  const handleOnchangeTitle = (value) => {
    setTodo({ ...todo, title: value });
  };

  const handeEnterKeyOnNewTask = async (value) => {
    // console.log(value);
    const response = await AxiosApi.post("/task", {
      action: value,
      date_id: id,
    });
    setNewTask("");
    setTasks([...tasks, response.data.data]);
  };

  const handleOnClickCheckBox = async (action) => {
    await AxiosApi.put(`/task/${action.id}`, {
      ...action,
      done: !action.done,
    });
    setTasks(
      tasks.map((item) => {
        if (item.id === action.id) {
          return { ...item, done: !action.done };
        } else {
          return item;
        }
      })
    );
  };

  const handleOnChangeAction = (action, value) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === action.id) {
          return { ...item, action: value };
        } else {
          return item;
        }
      })
    );
  };

  const handleUpdateAction = async (value, item) => {
    await AxiosApi.put(`/task/${item.id}`, {
      ...item,
      action: value,
    });
  };

  const handleOnClickDeleteTask = async (id) => {
    AxiosApi.delete(`/task/${id}`);
    setTasks(
      tasks.filter((action) => {
        return action.id !== id;
      })
    );
  };

  const handleTitle = async () => {
    await AxiosApi.put(`/title/${id}`, {
      title: todo.title,
    });
  };

  return (
    <div className="container-fluid p-0">
      <div className="text-center p-4 bg-warning">
        <strong className="pt-5 display-6">Update TODO</strong>
        <span
          className="float-end p-2 pe-3 bg-primary rounded grab"
          onClick={() => handleSave()}
        >
          Save
        </span>
      </div>
      <div className="card-header text-center">
        <input
          className="rounded p-2 m-4 b-0"
          type="text"
          placeholder=" Add Title"
          onChange={(event) => {
            handleOnchangeTitle(event.target.value);
          }}
          value={todo.title}
        ></input>
      </div>
      <div key={-1} className="row mt-2 mx-5 mb-4">
        <div className="col">
          <div className="card p-0 m-0">
            <div className="card-body p-0 m-0 ">
              <input
                className="rounded float-start w-100"
                type="text"
                placeholder=" Add new action"
                onChange={(event) => {
                  setNewTask(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.code === "Enter") {
                    handeEnterKeyOnNewTask(event.target.value);
                  }
                }}
                value={newTask}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {tasks &&
        tasks.map((val) => {
          return (
            <div
              key={val.id}
              className="row mt-2 mx-5 p-0 hover border border-1 rounded-start"
            >
              <div className="col">
                <span className="float-start">
                  <i
                    className={
                      val.done
                        ? "fa-solid fa-square-check  py-2 px-2 grab"
                        : "fa-regular fa-square  py-2 px-2 grab"
                    }
                    onClick={() => {
                      handleOnClickCheckBox(val);
                    }}
                  ></i>
                </span>
                <span
                  className="float-start p-top-1"
                  style={{
                    width: "96%",
                    padding: "2px 0px 0px 0px",
                  }}
                >
                  <input
                    className={
                      val.done ? "strike border-0  plain" : "border-0  plain "
                    }
                    style={{
                      width: "100%",
                    }}
                    onKeyDown={(event) => {
                      if (event.code === "Enter") {
                        handleUpdateAction(val.action, val);
                      }
                    }}
                    onChange={(event) => {
                      handleOnChangeAction(val, event.target.value);
                    }}
                    value={val.action}
                  ></input>
                </span>
                <span className="float-end py-1 px-2">
                  <i
                    className="fa-solid fa-xmark grab"
                    onClick={() => {
                      handleOnClickDeleteTask(val.id);
                    }}
                  ></i>
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UpdateTask;
