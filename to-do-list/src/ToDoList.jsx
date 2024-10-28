import React, {useState} from "react";

function ToDoList(){

    const [taskList, setTaskList] = useState([{name:"Gym", done:true}]);

    const [task, setTask] = useState("");


    function AddTask(){
        const newTask = {name:task, done:false};
        setTaskList(t => [...t, newTask]);
        setTask("");
    }

    //Swap t[i] and t[j]
    function swap(t, i, j){
        const tmp = t[i];
        t[i] = t[j];
        t[j] = tmp;
        return t;
    }

    function moveTaskUp(index){
        if(index === 0) return;
        setTaskList(t => swap([...t], index-1, index));
    }

    function moveTaskDown(index){
        if(index === (taskList.length - 1)) return;
        setTaskList(t => swap([...t], index+1, index));
    }

    function deleteTask(index){
        setTaskList( t => t.filter( (_, i) => i !== index) );
    }

    function handleInputChange(event){
        setTask(event.target.value);
    }

    function handleDoneChange(index){
        const oldTask = taskList[index];
        const updateTaskDone = {name:oldTask.name, done:!oldTask.done};
        setTaskList(t => t.map((task, i) => i === index ? updateTaskDone : task));
    }

    return(
    <div className="to-do-list">
        <h1>To Do List</h1>
        <ul>
            {taskList.map((task, index) => 
            <div className="task">
                <li  key={index} onClick={() => handleDoneChange(index)}>
                    {task.name} {task.done ? "✅" : "❌"}
                </li>
                <div>
                <button className="delete-button" key={index} onClick={() => deleteTask(index)}> 🗑 </button>
                <button key={index} onClick={() => moveTaskUp(index)}> ⬆ </button>
                <button key={index} onClick={() => moveTaskDown(index)}> ⬇ </button>
                </div>
                
            </div>
            )}
        </ul>
        <input type="text" value={task}
               onChange={handleInputChange} placeholder="Write a new task"></input>
        <button className="add-button" onClick={AddTask}>Add task</button>
    </div>
    )
}

export default ToDoList