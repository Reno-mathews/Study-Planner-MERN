import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import ProgressBar from "./components/ProgressBar";
import AddTaskForm from "./components/AddTaskForm";
import SortDropdown from "./components/SortDropdown";

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

  const [searchQuery, setSearchQuery] = useState("");

  const [sortType, setSortType] = useState("az");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
    fetchTasks();
    }
  }, [isLoggedIn]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try { 
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(!res.ok) {
      if (res.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        return;
      }
      throw new Error("Failed to fetch tasks");
    }
    const data = await res.json();
    setTasks(Array.isArray(data) ? data: []);
  } catch(err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
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

    const filteredTasks = tasks.filter((task) => {
      const matchesSubject =
        filterSubject === "All" || task.subject === filterSubject;

        const matchesSearch = task.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

          return matchesSubject && matchesSearch;
});

    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if(sortType === "az") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

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
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full space-y-6">
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start py-10">
      <div className="w-full max-w-md px-4 space-y-6 flex flex-col items-center">
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

      <ProgressBar progress={progress} />

      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Sort */}

        <SortDropdown
          sortType={sortType}
          setSortType={setSortType}
        />
        
       <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          subject={subject}
          setSubject={setSubject}
          onSubmit={addTask}
        />

      <button 
        className="mb-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
        onClick={() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }}
      >

        Logout
      </button>
      <TaskList
        tasks={sortedTasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}>
      </TaskList>
      
</div>
</div>
  );
}
      

export default App;