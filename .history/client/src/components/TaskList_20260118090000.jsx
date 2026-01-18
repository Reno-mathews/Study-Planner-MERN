import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggle, onDelete}) {
    if (tasks.length === 0) {
        return <p className="text-gray-400 text-center">No tasks found</p>;
    }

    return (
        <div className="w-full space-y-4">
            {tasks.map((task) => (
                <TaskCard   
                    key={task._id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;
