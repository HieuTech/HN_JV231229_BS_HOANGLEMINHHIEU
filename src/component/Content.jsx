import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react'
import Footer from './Footer';

export default function Content(prop) {
    const { data, saveData ,task, setTask} = prop;
    const [openDelete, setOpenDelete] = useState(false);
    
    const [openEdit, setOpenEdit] = useState(false);

    const [taskUpdateValue, setTaskUpdateValue] = useState("");
     const handleDelete = (taskDelete) => {
         console.log("taskDelete", taskDelete);
       const newArr = data.filter((task) => taskDelete.id !== task.id);
       console.log("newArr", newArr);
       saveData(newArr);
       handleCloseDelete();
     };

     const handleCloseDelete = () => {
       setOpenDelete(false);
     };

     const handleOnchangeEditTask = (e) => {
       const { name, value } = e.target;

       setTaskUpdateValue(value);
       setTask({ ...task, [name]: value });
     };

       const handleChecked = (taskCheck) => {
         const taskChangeStatusIndex = data.map((task) => {
           if (task.id === taskCheck.id) {
             task.status = !task.status;
           }
           return task;
         });
         saveData(taskChangeStatusIndex);
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
       const newArr = data.map((t) => {
         if (t.id === taskEdit.id) {
           t.id = taskEdit.id;
           t.taskName = task.taskName;
           t.status = taskEdit.status;
         }
         return t;
       });
       console.log("newArr", newArr);

       saveData(newArr);

       handleCloseEdit();
     };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };


  return (
    <>
      {data.length === 0 ? (
        <img
          src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg"
          className="w-96 h-96 mt-10"
        />
      ) : (
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
                    onOk={() => {
                      handleConfirmEdit(task);
                    }}
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
                    <p>Do you want to delete {task.taskName} task?</p>
                  </Modal>
                </div>
              </li>
            ))}
          </ul>
          <Footer data={data}/>
        </div>
      )}
    </>
  );
}
