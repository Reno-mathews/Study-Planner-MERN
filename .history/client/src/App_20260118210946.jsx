import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import ProgressBar from "./components/ProgressBar";
import AddTaskForm from "./components/AddTaskForm";
import SortDropdown from "./components/SortDropdown";
import AuthForm from "./components/AuthForm";
import SubjectFilter from "./components/SubjectFilter";
import Header from "./components/Header";
import LogoutButton from "./components/LogoutButton";
import LoadingSpinner from "./components/LoadingSpinner";

import {
  fetchTasksAPI,
  addTaskAPI,
  toggleTaskAPI,
  deleteTaskAPI,
} from "./utils/api";

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
        setLoading(true):
        const data = await fetchTasksAPI(token);
        setTasks(Array.isArray(data) ? data : []);
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const addTask = async (e) => {
      e.preventDefault();
      if (!newTask || !subject) return;

      const token = localStorage.getItem("token");

      try {
        const data = await addTaskAPI(token, {
          title: newTask,
          subject,
        });

        setTasks([...tasks, data]);
        setNewTask("");
        setSubject("");
      } catch(err) {
        console.error(err);
      }
    };

    const toggleComplete = async (id) => {
      const token = localStorage.getItem("token");

      try {
        const updatedTask = await toggleTaskAPI(token, id);

        setTasks(
          tasks.map((task) =>
          task._id === id? updatedTask: task
          )
      );
      } catch(err) {
        console.error(err);
      }
    };

    const deleteTask = async(id) => {
      const token = localStorage.getItem("token");

      try {
        await deleteTaskAPI(token, id);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch(err) {
        console.error(err);
      }
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
  
    if(!isLoggedIn) {
      return (
        <AuthForm
          isSignup={isSignup}
          setIsSignUp={setIsSignup}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onLogin={login}
          onSignup={signup}
        />
      );
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start py-10">
      <div className="w-full max-w-md px-4 space-y-6 flex flex-col items-center">
      <Header />
      {loading && <LoadingSpinner />}

      <SubjectFilter 
        subjects={subjects}
        filterSubject={filterSubject}
        setFilterSubject={setFilterSubject}
      />

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

      <LogoutButton
        onLogout={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      />
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