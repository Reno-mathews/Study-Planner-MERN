function TaskCard({ task, onToggle, onDelete}) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
            <div>
                <p
                    className={`font-medium ${
                        task.completed ? "line-through text-gray-400" : ""
                    }`}
                    >
                        {task.title}
                    </p>
                    <p className="flex gap-2">
                        <button
                            className="bg-green-600 hove:bg-green-700 px-3 py-1 rounded text-sm transition"
                            onClick={() => onToggle(task._id)}
                        >
                            {task.completed ? "Undo" : "Done"}
                        </button>

                        <button
                            className="bg-red hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                            onClick={()}
                        </button>
                    </p>
            </div>
        </div>
    )
}