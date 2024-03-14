// api/user/route.ts
import fs from 'fs';
import express from "express"; // create express app wich receive the data from todo app
import bodyParser from 'body-parser';  // to parse the JSON data received from script.js
import cors from 'cors'; // cors to declare the front-end origin of my todo app
interface Task {
    id: number;
    task: string;
    checked: boolean;
}
let tasks: Task[] = []; // Define a global array to store tasks
const fetchExistingTasks = (): Task[] => {
    return tasks; // For now, return the global tasks array
};
export async function GET(): Promise<Response> {
    return Response.json({ tasks: fetchExistingTasks() });
}
export async function POST(request: Request): Promise<Response> {
  const data = await request.json(); // Parse request body as JSON
  const { task } = data; // Extract the task from the request body
  const newTask: Task = { id: Date.now(), task, checked: false }; // Create a new task object
  tasks.push(newTask); // Add the new task to the global tasks array
  const response = await fetch("http://localhost:3001/bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask })
  });
  return Response.json({ tasks }); // Return a JSON response with the updated tasks list
}
const app = express();
app.use(bodyParser.json()); // use to parse the body data based on the JSON format and converts it into a JavaScript object
app.use(cors({ origin: 'http://localhost' })); // front-end origin
app.post('/user', async (req, res) => {
  console.log("User data received:", req.body);
  res.end();// Close the response
});
app.listen(3002, () => console.log("Server listening on port 3002")); // server started of express app to receive request from script.js
