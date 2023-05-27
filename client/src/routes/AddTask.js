import React, { useState } from "react";
import AxiosApi from "../Api/AxiosApi";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");
  const [actions, setActions] = useState([]);

  const handleOnclickDone = async (event) => {
    try {
      if (!(title === "" && actions.length === 0)) {
        event.preventDefault();
        await AxiosApi.post("/", {
          title,
          actions,
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnclickAddAction = () => {
    if (action) {
      setActions((prevState) => [...prevState, action]);
      setAction("");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="text-center p-4 bg-warning">
        <strong className="pt-5 display-6">Add TODO</strong>
        <span
          className="float-end p-2 pe-3 bg-primary rounded grab"
          onClick={(event) => handleOnclickDone(event)}
        >
          Done
        </span>
      </div>
      <div className="card-header text-center">
        <input
          className="rounded p-2 m-4"
          type="text"
          placeholder=" Add Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
                value={action}
                onKeyDown={(event) => {
                  if (event.code === "Enter") {
                    handleOnclickAddAction(event);
                  }
                }}
                onChange={(event) => setAction(event.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {actions.map((val) => (
        <div key={0} className="row mt-2 mx-5 p-0">
          <div className="col ">
            <div className="card">
              <div className="card-body pt-1 ps-2 pb-0">
                <i class="fa-regular fa-square float-start pt-2 px-2 "></i>
                <p className="pt-1 mb-2 float-start">{val}</p>
                {/* <i class="fa-regular fa-circle-xmark float-end pt-2"></i> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddTask;
