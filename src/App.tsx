import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoComponent from "./components/Todos/TodoComponent";
import "./App.Style.scss";

export type ITodo = {
  text: string;
  editMode: Boolean;
  status:Boolean
};



function App() {
  const [value, setValue] = useState<string>("");
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [btnValue, setBtnValue] = useState<string>("ADD");

  function get(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target;
    setValue(input.value);
  }
  function set() {
    let index = todo.findIndex((item) => item.editMode === true);
    
    if (value === "" || value === " ") {
      toast.error("Please fill in the field", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (todo.length === 0 || index === -1) {
      setTodo([
        ...todo,
        {
          text: value,
          editMode: false,
          status:false
        },
      ]);

      toast.success("Successfully added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setValue("");
    } else {
      let newTodo = [...todo];
      newTodo[index].text = value;
      newTodo[index].editMode = false;
      toast.info("Successfully edited!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTodo(newTodo);

      setBtnValue("ADD");
      setValue("");
    }

    todo.map((item)=>localStorage.setItem("todo", item.text))
    
  }

  function changeEditMode(index: number) {
    let newTodo = [...todo];
    newTodo[index].editMode = true;
    setValue(newTodo[index].text);
    setBtnValue("EDIT");

    setTodo(newTodo);
  }

  function changeStatus(index: number) {
    let newTodo = [...todo];

    if(newTodo[index].status===false){
      newTodo[index].status = true;
      toast.success("Task Completed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
    todo[index].status = false;
    toast.error("Task back to uncompleted list!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    }

    
    setTodo(newTodo)
  }


  function remove(index: number) {
    let newTodo = [...todo];
    newTodo.splice(index, 1);

    toast.warn("Successfully deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTodo(newTodo);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    set();
  };

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className="main d-flex flex-column align-items-center">
        <h1 className="mt-5">ToDo App</h1>

        <TodoForm
          handleSubmit={handleSubmit}
          value={value}
          get={get}
          set={set}
          btnValue={btnValue}
        />
        <ToastContainer style={{ fontSize: "18px" }} />

        <TodoComponent
          todo={todo}
          remove={remove}
          changeEditMode={changeEditMode}
          changeStatus={changeStatus}
        />
      </div>
    </div>
  );
}

export default App;
