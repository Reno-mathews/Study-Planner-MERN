import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

const API_URL = import.meta.env.VITE_API_URL;

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

  


  const removeToken = () => localStorage.removeItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const[isSignup, setIsSignup] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortType, setSortType] = useState("az");

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    if(isLoggedIn) {
    fetchTasks();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterSubject, sortType]);

    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
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
      const res = await fetch(`${API_URL}/api/auth/login`, {
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

      const res = await fetch("https://study-planner-mern.onrender.com/api/auth/register", {
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

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedTasks = sortedTasks.slice(startIndex, endIndex);
  
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
      <Dashboard
        loading={loading}
        subjects={subjects}
        filterSubject={filterSubject}
        setFilterSubject={setFilterSubject}
        progress={progress}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortType={sortType}
        setSortType={setSortType}
        newTask={newTask}
        setNewTask={setNewTask}
        subject={subject}
        setSubject={setSubject}
        addTask={addTask}
        sortedTasks={paginatedTasks}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        onLogout={() => {
          removeToken();
          setIsLoggedIn(false);
        }}
      />
  );
}
      

export default App;