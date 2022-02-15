import React, { FC, useState, ChangeEvent } from "react";
import "./Interfaces"
import { InterfacesTask } from "./Interfaces";
import './Todo.css'

const Todo: FC = () => {

    const [task, setTask] = useState<string>("");
    const [todoList, setTodoList] = useState<InterfacesTask[]>(() => {
        const storageList = JSON.parse("" + localStorage.getItem("storageList"));
        return storageList ?? [];

    });

    const addTask = (): void => {
        if (!task) return;
        const newTask = { taskName: task, isCompleted: false };
        const newList = [...todoList, newTask]
        setTodoList(newList);
        localStorage.setItem("storageList", JSON.stringify(newList))
        setTask("");

    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {


        setTask(event.target.value)

    }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {

        if (event.key === 'Enter') {
            addTask();
        }
    };
    const handleRemove = (index: number) => {

        const newList = [...todoList];
        newList.splice(index, 1);
        setTodoList(newList);
        localStorage.setItem("storageList", JSON.stringify(newList))

    }
    const handleComplete = (index: number) => {
        const newTask = { taskName: todoList[index].taskName, isCompleted: !todoList[index].isCompleted };
        const newList = [...todoList];
        newList[index] = newTask;
        setTodoList(newList);
        localStorage.setItem("storageList", JSON.stringify(newList))


    }
    return (
        <div>
            <div className="inputContainer">
                <input
                    className="input-field "
                    value={task} type="text"
                    placeholder="Enter your todo"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress} />
                <button
                    className="add-btn hover-cursor-pointer"
                    onClick={() => addTask()}>Add</button>
            </div>
            <ul>
                {todoList.map((job: InterfacesTask, key: number) => {
                    return <li key={key} className="task-line">
                        <span
                            className={`listing-task hover-cursor-pointer ${job.isCompleted ? 'completed' : ''}`}
                            onClick={() => handleComplete(key)}>{job.taskName}</span>
                        <button
                            className="remove-btn hover-cursor-pointer"
                            onClick={() => handleRemove(key)}>remove</button>
                    </li>
                })}
            </ul>
        </div>

    )

}

export default Todo;
