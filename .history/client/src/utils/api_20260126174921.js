const BASE_URL = "https://study-planner-mern.onrender.com/api";

export const fetchTasksAPI = async (token) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return res.json();
};

export const addTaskAPI = async (token, task) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    if (!res.ok) {
        throw new Error("Failed to add task");
    }

    return res.json();
};

export const toggleTaskAPI = async (token, id) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if(!res.ok) {
        throw new Error("Failed to toggle task");
    }

    return res.json();
};

export const deleteTaskAPI = async (token, id) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete task");
    }
};

