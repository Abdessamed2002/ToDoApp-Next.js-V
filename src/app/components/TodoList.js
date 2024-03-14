"use client"
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