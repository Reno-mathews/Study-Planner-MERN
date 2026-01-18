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
                            className="bg"
                    </p>
            </div>
        </div>
    )
}