import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = (props)=>{
    const [todos, SetTodos] = useState([]);

    return (<Context.Provider
                value ={
                            {
                                todos,
                                SetTodos,
                            }
                        }
    
            >
                {props.children}
            </Context.Provider>)
}