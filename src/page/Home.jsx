
import {  useState } from "react";
import Header from "../component/Header";
import Content from "../component/Content";

export default function Home() {
  const [data, setData] = useState(() => {
    let result = JSON.parse(localStorage.getItem("data")) || [];
    return result;
  });

  const [task, setTask] = useState({
    id: "",
    taskName: "",
    status: "",
  });


  const [errorInput, setErrorInput] = useState(false);
  
  

  //save Data

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  //delete

  

  //Onchange Created Task

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log("e", value);

    if (value.length == 0) {
      setErrorInput(true);
      return;
    }
    setErrorInput(false);

    setTask({ ...task, [name]: value });

  };

  // submit Create Task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorInput) {
      const newTask = {
        id: Math.ceil(Math.random() * Date.now()),
        taskName: task.taskName,
        status: false,
      };

      const newData = [...data, newTask];
      saveData(newData);
    }
  };



  
  return (
    <>
      <div className="flex h-screen items-center flex-col max-w-5xl my-4">
        <Header
          errorInput={errorInput}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />
        <Content
          saveData={saveData}
          task={task}
          setTask={setTask}
          data={data}
        />
      </div>
    </>
  );
}
