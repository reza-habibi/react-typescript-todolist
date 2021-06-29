import React from "react";
import { FaEdit, FaCheck , FaUndo } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ITodo } from "../../App";

type IProps = {
  todo: ITodo[];
  remove: (index: number) => void;
  changeEditMode: (index: number) => void;
  changeStatus: (index: number) => void;
}

const TodoComponent: React.FC<IProps> = ({
  todo,
  remove,
  changeEditMode,
  changeStatus,
}) => {
  return (
    <div className="div-card">
      {todo.map((item, index) => {
        
        return (
          <div
            key={index}
            className="cards mb-3 d-flex justify-content-between align-items-center"
          >
            {item.status ? (
              <div className="pl-3 w-75 bg-success text-light rounded">
                <p className="title">{item.text}</p>
              </div>
            ) : (
              <div className="undone w-75">
                <p className="title">{item.text}</p>
              </div>
            )}
            {item.editMode ? null : (
              <div className="icons  d-flex justify-content-around w-25">
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

              {item.status ? <FaUndo
                  style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                    color: "fdd000",
                  }}

                  onClick={() => changeStatus(index)}

                /> :<FaCheck
                  style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                    color: "fdd000",
                  }}

                  onClick={() => changeStatus(index)}

                />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodoComponent;
