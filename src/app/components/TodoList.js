"use client"
// components/TodoList.js
import React from 'react';
import Task from './Task';

const TodoList = ({ tasks, onToggle, onRemove }) => {
  if (!Array.isArray(tasks)) {
      return <div>No tasks found</div>;
  }

  return (
      <div>
          {tasks.map(task => (
              <Task
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onRemove={onRemove}
              />
          ))}
      </div>
  );
};

export default TodoList;




/*
import React from 'react';


const TodoList = ({ tasks, toggleTask, removeTask }) => {
  return (
    <div>
      {// Check if tasks exist and if it's an array //}
      {tasks && Array.isArray(tasks) && tasks.map(task => (
        <div className="div-todo" key={task.id} onMouseOver={() => checkValues(task)}>
          <button className="check" onClick={() => toggleTask(task.id)}>
            <i className={task.checked ? "fa-solid fa-check" : ""} style={{ display: task.checked ? "inline" : "none" }}></i>
          </button>
          <input value={task.text} readOnly /> {// Changed task.task to task.text // }
          <button className="clear" onClick={() => removeTask(task.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
    </div>
  );
};
export default TodoList;
*/












/*
      {tasks.map(task => (
        <div className="div-todo" key={task.id} onMouseOver={() => checkValues(task)}>
          <button className="check" onClick={() => toggleTask(task.id)}>
            <i className={task.checked ? "fa-solid fa-check" : ""} style={{ display: task.checked ? "inline" : "none" }}></i>
          </button>
          <input value={task.task} readOnly />
          <button className="clear" onClick={() => removeTask(task.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
*/
// export default TodoList;

/*
const TodoList = ({ tasks }) => {
  // Check if window object is defined (i.e., we're in the client-side context)
  if (typeof window !== 'undefined') {
    // Access the location object only in the client-side context
    const currentLocation = window.location;
    console.log('Current URL:', currentLocation.href);
  }

  return (
    <div>
      {// Render the list of tasks //}
    </div>
  );
};

export default TodoList;
*/





/*
const TodoList = ({ tasks }) => {
  const checkValues = (task) => {
    // Implement your logic for onMouseOver event
    console.log('Mouse over task:', task);
  };

  return (
    <div>
      {tasks.map(task => (
        <div className="div-todo" key={task.id} onMouseOver={() => checkValues(task)}>
          {// Render individual tasks // }
        </div>
      ))}
    </div>
  );
};
*/