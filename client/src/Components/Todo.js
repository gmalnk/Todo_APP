import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../Api/AxiosApi";
import { Context } from "../Context/Context";

const Todo = (props) => {
  const navigate = useNavigate();
  const { deleted, setDeleted } = useContext(Context);

  const year = props.date.split("-")[0];
  const month = props.date.split("-")[1];
  const date = props.date.split("-")[2].slice(0, 2);
  const tasks = props.tasks ? props.tasks.split(",") : [];

  const taskToPrint = (task, line) => {
    return task.length > 17
      ? line + ". " + task.slice(0, 18) + "..."
      : line + ". " + task + (task && "...");
  };

  const handleClickOnTitle = (id) => {
    navigate(`/updatetask/${id}`);
  };

  const handleDeleteTodo = async (event, id) => {
    event.stopPropagation();
    event.preventDefault();
    const response = await AxiosApi.delete(`/${id}`);
    setDeleted(!deleted);
  };

  return (
    <div key={props.id} className="col mt-4 h-1000">
      <div className="card ">
        <div
          className="card-header text-center bg-note-dark grab"
          onClick={() => handleClickOnTitle(props.id)}
        >
          {/* <><i className="fa-solid fa-bars pt-1"></i></> */}
          <i className="fa-solid fa-ellipsis float-start pt-1"></i>
          <strong className="">{" " + props.title}</strong>
          <i
            className="fa-solid fa-xmark float-end pt-1"
            onClick={(event) => handleDeleteTodo(event, props.id)}
          ></i>
        </div>
        <div className="card-body bg-note-light">
          <div className="table p-1 pb-0">
            <p className="mb-0">{taskToPrint(tasks[0] ? tasks[0] : "", 1)}</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">{taskToPrint(tasks[1] ? tasks[1] : "", 2)}</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">{taskToPrint(tasks[2] ? tasks[2] : "", 3)}</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">{taskToPrint(tasks[3] ? tasks[3] : "", 4)}</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">{taskToPrint(tasks[4] ? tasks[4] : "", 5)}</p>
            <hr className="mt-0 mb-0"></hr>
          </div>
        </div>
        <div className="card-footer text-center bg-note-light">
          <strong>{date + "-" + month + "-" + year}</strong>
        </div>
      </div>
    </div>
  );
};

export default Todo;
