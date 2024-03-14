// components/TodoForm.js
import React from 'react';

const TodoForm = ({ onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = e.target.elements.newTodo.value;
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task })
    });
    if (response.ok) {
      onSubmit(task);
      e.target.reset();
    } else {
      console.error('Failed to add task');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div id="div-newTodo">
        <input name="newTodo" type="text" placeholder="Add your new todo" required />
        <button type="submit"><i className="fa-solid fa-plus"></i></button>
      </div>
    </form>
  );
};

export default TodoForm;
