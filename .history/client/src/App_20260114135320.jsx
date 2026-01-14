import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [subject, setSubject] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if(!newTask || !subject) return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, subject}),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
    setSubject("");
  };

    const toggleComplete = async (id) => {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method:"PATCH",
      });

      const updatedTask = await res.json();

      setTasks(
        tasks.map((task) =>
        task.id === id ? updatedTask : task 
      )
      );
    };

    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    };

    const subjects = ["All", ...new Set(tasks.map((task) => task.subject))];
  

  return (
    <div>
      <h1>My Study Planner</h1>

      <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
        {subjects.map((subj, index) => (
          <option key={index} value={subj}>
            {subj}
          </option>
        ))}
      </select>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {tasks
        .filter((task) =>
          filterSubject === "All" ? true: task.subject === filterSubject
      )
      .map((task) =>(
        <div key={task.id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
            >
            {task.title} - <strong>{task.subject}</strong>
            </span>

            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
        </div>
      ))}
    </div>
  );
}

export default App;