function AddTaskForm({
    newTask,
    setNewTask,
    subject,
    setSubject,
    onSubmit,
}) {
    return (
        <form
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-full space-y-4"
            onSubmit={onSubmit}
        >
            <h2 className="text-xl font-semibold text-center mb-2">
                Add a new task
            </h2>

            <input 
                className="w-full px-4 py-2 rounded bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <input 
                class
        </form>
    )
}