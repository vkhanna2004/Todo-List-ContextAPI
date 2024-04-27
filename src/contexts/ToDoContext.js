import { createContext, useContext } from "react";

export const ToDoContext = createContext(
{
  todos: [
    {
        id: 0,
        todo: "",
        completed: false,
    }    
],
    addTodo: (todo) =>{},
    updateTodo: (id,todo)=>{},
    deleteTodo : (id)=>{},
    checkComplete : (id)=>{}
}
);

export const useTodo = () => {
  return useContext(ToDoContext);
};

export const TodoProvider = ToDoContext.Provider;
