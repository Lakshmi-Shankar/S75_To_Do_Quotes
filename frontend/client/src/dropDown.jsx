import React, { useState, useEffect } from "react";

const Dropdown = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    // Fetch users
    useEffect(() => {
        fetch("http://localhost:3000/api") // ✅ Correct users API
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) throw new Error("Invalid response");
                setUsers(data);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to load users");
            });
    }, []);

    // Fetch tasks for selected user
    useEffect(() => {
        if (!selectedUser || selectedUser.length !== 24) { 
            setTasks([]);
            return;
        }
    
        fetch(`http://localhost:3000/api/tasks?created_by=${selectedUser}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch tasks");
                return res.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) throw new Error("Invalid response format");
                setTasks(data);
                setError("");
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setError(err.message || "Failed to fetch tasks");
                setTasks([]);
            });
    }, [selectedUser]);
    return (
        <div>
            <h2>Task Management</h2>

            {/* User Selection Dropdown */}
            <label>Select a User:</label>
            <select onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">-- Select User --</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {/* Display Tasks of Selected User */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h3>Tasks by {selectedUser ? users.find(u => u._id === selectedUser)?.name || "User" : "User"}</h3>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id}>{task.title} - {task.status}</li>
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </ul>
        </div>
    );
};

export default Dropdown;
