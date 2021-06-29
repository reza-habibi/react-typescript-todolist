import { Button, Form } from "react-bootstrap";

type ITodoForm ={
    handleSubmit:(e: React.FormEvent<HTMLFormElement>)=>void;
    get:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    value:string;
    set:()=>void;
    btnValue:string;
}

const TodoForm:React.FC<ITodoForm>=({handleSubmit,get,value,set,btnValue})=> {
    return (
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
        </Form>)
}

export default TodoForm
