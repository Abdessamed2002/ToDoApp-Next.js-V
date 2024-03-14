import React from 'react';
const TaskCounter = ({ count, removeAllTasks }) => {
  return (
    <div className="div-todo2">
      <input type="text" value={`You have ${count} pending task${count !== 1 ? 's' : ''}`} readOnly />
      <button type="button" onClick={() => removeAllTasks()}><span>Clear All</span></button>
    </div>
  );
};
export default TaskCounter;