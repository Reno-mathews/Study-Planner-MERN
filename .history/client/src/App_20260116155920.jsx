import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [subject, setSubject] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  const getToken = () => localStorage.getItem("token");
  const setToken = (token) => localStorage.setItem("token", token);
  const removeToken = () => localStorage.removeItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const[isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
    fetchTasks();
    }
  }, [isLoggedIn]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if(!newTask || !subject) return;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask, subject}),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
    setSubject("");
  };

    const toggleComplete = async (id) => {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method:"PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedTask = await res.json();

      setTasks(
        tasks.map((task) =>
        task._id === id ? updatedTask : task 
      )
      );
    };

    const deleteTask = async (id) => {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    };

    const subjects = ["All", ...new Set(tasks.map((task) => task.subject))];

    const filteredTasks = tasks.filter((task) =>
    filterSubject === "All" ? true: task.subject === filterSubject
  );

      const login = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if(data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        fetchTasks();
      } else {
        alert("Login failed");
      }
    };

    const signup = async (e) => {
      e.preventDefault();

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! You can now log in.");
        setIsSignup(false);
      } else {
        alert(data.message || "Signup failed");
      }
    };

  const completedCount = filteredTasks.filter((task) => task.completed).length;
  const totalCount = filteredTasks.length;

  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  
    if (!isLoggedIn) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-6">
          <h2 className="text-2xl font-bold text-center">
            {isSignup ? "Signup" : "Login" }
          </h2>

          <form 
          onSubmit={isSignup ? signup : login}
          className="space-y-4"
          >
            <input
              className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
              type="submit"
              >
              {isSignup ? "Signup" : "Login"}
            </button>
          </form>

          <p>
            {isSignup ? "Already have an account?" : " Don't have an account?"}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
              onClick={() => setIsSignup(!isSignup)}
              style={{ marginLeft: "10px" }}
            >
              {isSignup ? "Login" : "Signup"}
            </button>
          </p>
        </div>
      </div>
      );
    }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold"
      >My Study Planner</h1>

      <select 
        className= "bg-gray-800 text-white px-4 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterSubject} 
        onChange={(e) => setFilterSubject(e.target.value)}
      >
        {subjects.map((subj, index) => (
          <option key={index} value={subj}>
            {subj}
          </option>
        ))}
      </select>

      <div 
      className="w-full max-w-md mb-8"
      >
        <p className="mb-2 text-sm text-gray-300">
          Progress: {progress}%
        </p>

        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300"  
            style={{
                width: `${progress}%`,
                background: "green",
                height: "100%",
                borderRadius: "10px",
                transition: "width 0.3s ease",
            }}
        ></div>
        </div>
      </div>

      <form
      className = "bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-4"
      onSubmit={addTask}>
      <h2 className="text-xl font-semibold text-center mb-2" >
        Add a new task
      </h2>

        <input
        className = "w-full px-4 py-2 rounded bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}  
        />

        <input
          className= "w-full px-4 py-2 rounded bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button 
          className = "w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
          type="submit"
          disabled={!newTask || !subject}
          >Add</button>
      </form>

      <button 
        className="mb-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
        onClick={() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }}
      >

        Logout
      </button>

      <div className="w-full max-w-md space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <p  
                  className={`font-medium ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-gray-400">{task.subject}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition"
                  onClick={() => toggleComplete(task._id)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;