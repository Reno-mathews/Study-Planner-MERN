import Header from "./Header";
import SubjectFilter from "./SubjectFilter";
import ProgressBar from "./ProgressBar";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import AddTaskForm from "./AddTaskForm";
import LogoutButton from "./LogoutButton";
import TaskList from "./TaskList";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

function Dashboard({
    loading,
    subjects,
    filterSubject,
    setFilterSubject,
    progress,
    searchQuery,
    setSearchQuery,
    sortType,
    setSortType,
    newTask,
    setNewTask,
    subject,
    setSubject,
    addTask,
    sortedTasks,
    toggleComplete,
    deleteTask,
    onLogout,
    currentPage,
    setCurrentPage,
    totalPages,
}) {
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

                <LogoutButton onLogout={onLogout} />

                <TaskList
                    tasks={sortedTasks}
                    onToggle={toggleComplete}
                    onDelete={deleteTask}
                />
            </div>
        </div>
    );
}

export default Dashboard;
