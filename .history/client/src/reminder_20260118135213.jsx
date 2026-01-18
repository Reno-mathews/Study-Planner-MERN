<div className="w-full space-y-4">
        {sortedTasks.map((task) => (
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
  </div>
  );
}


 <form
      className = "bg-gray-800 p-8 rounded-lg shadow-lg w-full space-y-4"
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