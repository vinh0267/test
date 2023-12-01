import React, { useState } from "react";
export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [idUpdate, setIdUpdate] = useState(-1)

  const addTask = () => {

    if (idUpdate != -1) {
        const index = tasks.findIndex(task => task.id == idUpdate)
        let newTasks = [...tasks]
        newTasks[index] = {
            ...newTasks[index],
            name: newTask
        }
        setTasks(newTasks)
        setNewTask("")
        setIdUpdate(-1)
        return
    }

    setTasks((preTask) => [
      ...preTask,
      {
        id: tasks[tasks.length - 1]?.id + 1 || 1,
        name: newTask,
        complete: false,
      },
    ]);
    setNewTask("");
  };

  const delelteTask = (id) => {
    let newTasks = [...tasks];
    newTasks = newTasks.filter((task) => task.id != id);
    setTasks(newTasks);
  };

  const handleChangeStatus = (id) => {
    const index = tasks.findIndex((task) => task.id == id);
    let newTasks = [...tasks];
    newTasks[index].complete = !newTasks[index].complete;
    setTasks(newTasks);
  };

  const handleClickEdit = (task) => {
    setIdUpdate(task.id)
    setNewTask(task.name)
  }

  return (
    <>
      <div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span
                style={{
                  display: "inline-block",
                  textDecoration: task.complete ? "line-through" : "none",
                  width: 200,
                  color: idUpdate == task.id ? "red" : "black"
                }}
                onClick={() => handleClickEdit(task)}
              >
                {task.name}
              </span>
              {/* <input
                type="checkbox"
                value={task.complete}
                onChange={() => handleChangeStatus(task.id)}
              /> */}
              <button onClick={() => handleChangeStatus(task.id)}>{task.complete ? "true" : "false"}</button>
              <button onClick={() => delelteTask(task.id)}>Del</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      
    </>

  );
}
