function TaskCard({ task, onToggle, onDelete}) {
    return (
        <div className="bg-gray-800/80 backdrop-blur p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 hover:bg-gray-800 transition">

            {/* Left side */}
            <div className="flex flex-col">
                <p
                    className={`text-lg font-semibold ${
                        task.completed ? "line-through text-gray-400" : "text-white"
                    }`}
                    >
                        {task.title}
                    </p>
                    <p className="text-sm text-gray-400">{task.subject}</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="bg-green-600 hove:bg-green-700 px-3 py-1 rounded text-sm transition"
                            onClick={() => onToggle(task._id)}
                        >
                            {task.completed ? "Undo" : "Done"}
                        </button>

                        <button
                            className="bg-red hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                            onClick={() => onDelete(task._id)}
                        >
                            Delete
                        </button>
                    </div>
            </div>
    )
}

export default TaskCard;