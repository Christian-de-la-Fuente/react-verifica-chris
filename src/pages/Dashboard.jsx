import { CiLogin as Login } from "react-icons/ci";
import { useState } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";

import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import TodoCard from "../components/TodoCard";

const options = [
  { value: "ALTA", label: "Alta" },
  { value: "MEDIA", label: "Media" },
  { value: "BASSA", label: "Bassa" }
];

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: uuid(),
    titolo: "",
    dataDiScadenza: "",
    priorita: "",
    completato: false
  });
  const [disabled, setDisabled] = useState(true);
  const [buttonTittle, setButtonTittle] = useState("Submit");

  const formController = todo => {
    if (todo.titolo !== "" && todo.dataDiScadenza !== "" && todo.priorita !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onChange = (event, key) => {
    // const value = event.target !== undefiend ? event.target.value : event.value;
    let value = "";

    if (event.target !== undefined) {
      value = event.target.value;
    } else {
      value = event.value;
    }

    setTodo({
      ...todo,
      [key]: value
    });

    formController({
      ...todo,
      [key]: value
    });
  };

  const todosOnChange = (todo, operation) => {
    const { id } = todo;
    if (operation === "checkbox") {
      setTodos(prevState => {
        const foundTodo = prevState.find(todo => todo.id === id);
        foundTodo.completato = !foundTodo.completato;
        return [...prevState];
      });
    }
    if (operation === "delete") {
      setTodos(prevState => {
        const restTodos = prevState.filter(todo => {
          if (todo.id === id) {
            return false;
          } else {
            return true;
          }
        });
        return [...restTodos];
      });
    }
    if (operation === "edit") {
      setTodo({
        ...todo
      });
      setButtonTittle("Update");
    }
  };

  function onClick() {
    if (buttonTittle === "Submit") {
      setTodos([...todos, todo]);
    }

    if (buttonTittle === "Update") {
      setTodos(prevState => {
        const newTodos = prevState.map(t => {
          if (t.id === todo.id) {
            return todo;
          }
          return t;
        });
        return newTodos;
      });
      setButtonTittle("Submit");
    }

    setTodo({
      id: uuid(),
      titolo: "",
      dataDiScadenza: "",
      priorita: "",
      completato: false
    });
  }

  let todosTitles = null;
  if (Array.isArray(todos) && todos.length > 0) {
    todosTitles = todos.map(todo => {
      return (
        <TodoCard
          key={todo.id}
          titolo={todo.titolo}
          checked={todo.completato}
          dataDiScadenza={todo.dataDiScadenza}
          priorita={todo.priorita}
          onChange={() => todosOnChange(todo, "checkbox")}
          deleteOnClick={() => todosOnChange(todo, "delete")}
          editOnClick={() => todosOnChange(todo, "edit")}
        />
      );
    });
  }

  return (
    <>
      <Header title="Dashbaord" icon={<Login />} to="/login" />
      <Card>
        <div className="w-full flex justify-between items-center">
          <div>
            <h1>Todo Done</h1>
            <h4>keep it up</h4>
          </div>
          <div>{todos.length}</div>
        </div>
      </Card>
      {/* todo form */}
      <div className="w-full flex justify-center items-center mt-5">
        <div className="w-3/6">
          <Input type="text" placeholder="Inserisci il task" value={todo.titolo} onChange={e => onChange(e, "titolo")} />
          <Input type="date" placeholder="Inserisci la data di scadenza" value={todo.dataDiScadenza} onChange={e => onChange(e, "dataDiScadenza")} />
          <Select
            options={options}
            value={options.find(option => option.value === todo.priorita) ?? null}
            placeholder="Scegli la priorita"
            className="mt-2"
            onChange={e => onChange(e, "priorita")}
          />
          <Button title={buttonTittle} onClick={onClick} disabled={disabled} />
        </div>
      </div>
      {todosTitles}
    </>
  );
}

export default Dashboard;
