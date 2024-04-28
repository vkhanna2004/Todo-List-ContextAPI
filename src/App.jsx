import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/ToDoContext";
import {TodoForm, TodoItem} from "./components/index" 

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (todo.todo.trim().length !== 0 ){
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);}
  };

  const updateTodo = (id, todo) => {
    const trimmedText = todo.todo.trim();

    if (trimmedText.length === 0) {
      alert("Please enter something!!!"); // Alert for empty updates
      return; // Prevent empty updates from proceeding
    }
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    localStorage.clear();
    setTodos([]); // Update the state to reflect the empty list
  };
  
  const checkComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length>0){
      setTodos(todos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  

  return (
    <TodoProvider value={{ addTodo, deleteTodo, updateTodo, checkComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          
          <h1 className="text-3xl font-bold text-center mb-2 mt-2">TO DO LIST </h1>
          <h1 className="text-3xl font-bold text-center mb-8 mt-2">(built using context API and local storage) </h1>

          <h2 className="text-2xl font-bold text-center mb-8 mt-2 underline">
            Manage Your Todos
          </h2>

          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="inline-flex items-center rounded-r-lg px-3 py-1 mb-4 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold"
              onClick={() => deleteAllTodos()}
            >
              Delete All
            </button>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>
          (<div key={todo.id} className="w-full">
            <TodoItem todo={todo}/>
          </div>
          ))}
          </div>
          
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
