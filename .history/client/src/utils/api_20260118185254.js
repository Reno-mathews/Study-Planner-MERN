const BASE_URL = "http://localhost:5000/api";

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

export const addTaskAPI = async (token,)

