import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
// import tasks from "../../data.json"

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

  const inputRef = useRef(null);

  const [errorInput, setErrorInput] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [taskUpdateValue, setTaskUpdateValue] = useState("");
  //checkCompletedTask

  const checkCompletedTask = () => {
    let numberCompletedTask = 0;
    data.map((task) => {
      if (task.status) {
        numberCompletedTask += 1;
      }
    });
    return numberCompletedTask;
  };

  //save Data

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  //delete
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = (taskDelete) => {


    const newArr = data.filter((task) => taskDelete.id !== task.id);
    saveData(newArr);
    handleCloseDelete();
  };

  //Edit
  const handleOpenEdit = (task) => {
    setTaskUpdateValue(task.taskName);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleConfirmEdit = (taskEdit) => {
    const newArr = data.map((t)=>{
        if(t.id === taskEdit.id){
            t.id = taskEdit.id
            t.taskName = task.taskName;
            t.status = taskEdit.status;
        }
        return t;
    })
    console.log("newArr",newArr);

    saveData(newArr);
    

    handleCloseEdit();
  };

  const handleOnchangeEditTask = (e) => {
    const {name,value} = e.target;
        
    setTaskUpdateValue(value)
    setTask({...task, [name]:value})
  };

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

  const handleChecked = (taskCheck) => {
    console.log("task", taskCheck);

    const taskChangeStatusIndex = data.map((task) => {
      if (task.id === taskCheck.id) {
        task.status = !task.status;
      }
      return task;
    });
    saveData(taskChangeStatusIndex);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className="flex h-screen items-center flex-col max-w-5xl my-4">
        <h1 className="text-center text-lg font-semibold my-3">
          Danh sách công việc
        </h1>
        <div>
          <form className="flex items-center " onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="w-[500px] mx-4 h-7 rounded-sm placeholder:px-3"
              placeholder="Nhập
              tên
              công
              việc"
              name="taskName"
              onChange={handleOnChange}
            ></input>
            <Button htmlType="submit" Type type="primary">
              Thêm
            </Button>
          </form>
          {errorInput && (
            <p className="text-red-500">Input Field Is Not Be Empty</p>
          )}
        </div>

        <div className="list-task-content my-3">
          <ul>
            {data.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between w-[550px]"
              >
                <div className="">
                  <input
                    name="checkTask"
                    type="checkbox"
                    checked={task.status}
                    onChange={() => {
                      handleChecked(task);
                    }}
                  />
                  {task.status ? (
                    <s className="mx-2">{task.taskName}</s>
                  ) : (
                    <label className="mx-2">{task.taskName}</label>
                  )}
                </div>
                <div className="">
                  <EditOutlined
                    className="text-orange-500 mx-5 cursor-pointer"
                    onClick={() => {
                      handleOpenEdit(task);
                    }}
                  />
                  <Modal
                    title="Cập nhật công việc"
                    open={openEdit}
                    onOk={()=>{handleConfirmEdit(task)}}
                    onCancel={handleCloseEdit}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <p>Tên công việc</p>
                    <input
                      name="taskName"
                      value={taskUpdateValue}
                      className="w-full rounded-sm bg-orange-50 "
                      onChange={handleOnchangeEditTask}
                    ></input>
                  </Modal>

                  <DeleteOutlined
                    className="text-red-600 cursor-pointer"
                    onClick={handleOpenDelete}
                  />
                  <Modal
                    title="Confirm Delete"
                    open={openDelete}
                    onOk={() => {
                      handleDelete(task);
                    }}
                    onCancel={handleCloseDelete}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <p>Do you want to delete this task?</p>
                  </Modal>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-200 rounded-sm my-2">
            <p>
              Công việc đã hoàn thành:
              <span className="font-semibold">
                {checkCompletedTask() === 0 ? 0 : checkCompletedTask()}/{" "}
                {data.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
