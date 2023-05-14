import React from "react";
import { useNavigate } from "react-router-dom";

const BlankTodo = () => {
  const navigate = useNavigate();

  const handleAddTodo = () => {
    navigate("/addtask");
  };

  return (
    <div key={-1} className="col mt-4">
      <div className="card  float-right">
        <div
          className="card-header bg-note-dark float-right grab"
          onClick={() => {
            handleAddTodo();
          }}
        >
          <i className="fa-solid fa-plus"></i>
          <strong>{" ADD"}</strong>
        </div>
        <div className="card-body bg-note-light">
          <div className="table p-1 pb-0 mt-0">
            <p className="mb-0">1.</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">2.</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">3.</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">4.</p>
            <hr className="mt-0 mb-0"></hr>
            <p className="mb-0">5.</p>
            <hr className="mt-0 mb-0"></hr>
          </div>
        </div>
        <div className="card-footer text-center bg-note-light">
          <strong>--------</strong>
        </div>
      </div>
    </div>
  );
};

export default BlankTodo;
