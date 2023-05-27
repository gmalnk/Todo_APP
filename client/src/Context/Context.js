import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [todos, SetTodos] = useState([]);
  const [deleted, setDeleted] = useState(false);

  return (
    <Context.Provider
      value={{
        todos,
        SetTodos,
        deleted,
        setDeleted,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
