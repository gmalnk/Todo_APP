import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import UpdateTask from "./routes/UpdateTask.js";
import { ContextProvider } from "./Context/Context.js";
import AddTask from "./routes/AddTask.js";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/updatetask/:id" Component={UpdateTask} />
          <Route exact path="/addtask" Component={AddTask} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
