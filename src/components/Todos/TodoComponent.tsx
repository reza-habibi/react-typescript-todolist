import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ITodo } from "../../App";

interface IProps {
  todo: ITodo[];
  remove: (index: number) => void;
  changeEditMode: (index: number) => void;
}

const TodoComponent :React.FC<IProps> = ({todo,remove,changeEditMode}) => {
  return (
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
  );
};

export default TodoComponent;
