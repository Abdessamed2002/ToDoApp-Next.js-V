"use client"
import React, { useState, useEffect } from 'react';
import TodoForm from './/components/TodoForm';
import TodoList from './/components/TodoList';
import TaskCounter from './/components/TaskCounter';
import '@fortawesome/fontawesome-free/css/all.css';

const IndexPage = () => {
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(0);
  const removeAllTasks = () => {
    setTasks([]);
    setCounter(0);
  };
  useEffect(() => { // Fetch existing tasks on component mount
    const existingTasks = fetchExistingTasks(); // Implement this function
    setTasks(existingTasks);
    setCounter(existingTasks.length);
  }, []);
  const fetchExistingTasks = () => {
      return [];
  };
  const handleAddTask = (task) => {
      const newTask = { id: Date.now(), task, checked: false };
      setTasks([...tasks, newTask]);
      setCounter(counter + 1);
  };
  const handleToggleTask = (taskId) => {
      const updatedTasks = tasks.map((task) => task.id === taskId ? { ...task, checked: !task.checked } : task );
      setTasks(updatedTasks);
      setCounter(counter + (updatedTasks.find((task) => task.id === taskId).checked ? -1 : 1));
  };
  const handleRemoveTask = (taskId) => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      setCounter(counter - 1);
  };
  return (
      <div>
          <h1>To Do App</h1>
          <TodoForm onSubmit={handleAddTask} />
          <TodoList tasks={tasks} onToggle={handleToggleTask} onRemove={handleRemoveTask} />
          <TaskCounter count={counter} removeAllTasks={removeAllTasks}/>
      </div>
  );
};
export default IndexPage;






  //const router = useRouter();
    // Marks this component and its children as client components
  // Sample tasks data (replace this with actual tasks data from your application)
  /*
  const tasks = [
    { id: 1, text: 'Task 1', checked: false },
    { id: 2, text: 'Task 2', checked: true },
    // Add more tasks as needed
  ];

  return (
    <div>
      <h1>To Do App</h1>
      <TodoForm />
      <TodoList tasks={tasks}/>
      <TaskCounter />
    </div>
  );
  };
  */