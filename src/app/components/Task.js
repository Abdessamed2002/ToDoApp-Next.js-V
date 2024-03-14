import React from 'react';
const Task = ({ task, onToggle, onRemove }) => {
    return (
        <div className="div-todo" data-task-id={task.id} data-task-checked={task.checked}>
            <button className="check" onClick={() => onToggle(task.id)}>
                <i className="fa-solid fa-check" style={{ display: task.checked ? 'inline' : 'none' }}></i>
            </button>
            <input value={task.task} readOnly />
            <button className="clear" onClick={() => onRemove(task.id)}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    );
};
export default Task;