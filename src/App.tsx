import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

import "./App.Style.scss";

function App() {
  type ITodo = {
    text: string;
    editMode: Boolean;
  };

  const [value, setValue] = useState<string>("");
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [btnValue, setBtnValue] = useState<string>("ADD");


  function get(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target ;
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
  }

  function changeEditMode(index: number) {
    let newTodo = [...todo];
    newTodo[index].editMode = true;
    setValue(newTodo[index].text);
    setBtnValue("EDIT");

    setTodo(newTodo);
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

        <Form
          className="w-75 my-5 d-flex justify-content-between align-items-center"
          onSubmit={handleSubmit}
        >
          <Form.Control
            type="text"
            placeholder="Add Your Task ..."
            className="input"
            onChange={get}
            value={value}
          />
          <Button onClick={set}>{btnValue}</Button>
        </Form>
        <ToastContainer style={{ fontSize: "18px" }} />

        <div className="div-card">
          {todo.map((item, index) => (
            <div
              key={index}
              className="cards d-flex justify-content-between align-items-center"
            >
              <div>
                <p className="title">{item.text}</p>
              </div>
              {item.editMode ? null : (
                <div className="icons">
                  <MdDelete
                    style={{
                      fontSize: "2rem",
                      cursor: "pointer",
                      color: "#E30B5C	",
                    }}
                    onClick={() => remove(index)}
                  />
                  <FaEdit
                    style={{
                      fontSize: "2rem",
                      cursor: "pointer",
                      color: "0437F2",
                    }}
                    onClick={() => changeEditMode(index)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
